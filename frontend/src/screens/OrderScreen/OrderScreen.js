import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../../actions/orderActions';
import CircularLoader from '../../components/Loaders/CircularLoader';
import Message from '../../components/Message/Message';
import cartSubtotalHelper from '../../helpers/cartSubtotalHelper';
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../../constants/orderConstants';
import OrderInfo from './components/OrderInfo';
import OrderPayment from './components/OrderPayment';
import AdminActions from './components/AdminActions';
import Meta from '../../components/Meta/Meta';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },

    '& .MuiButtonBase-root': {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      width: '100%',
    },

    '& .MuiRadio-root': {
      marginTop: 0,
      marginBottom: 0,
      width: '20%',
      marginRight: theme.spacing(1),
    },

    '& .MuiInputBase-root': {
      width: '95%',
    },
  },
  heading: {
    marginBottom: theme.spacing(2),
    color: theme.palette.grey[700],
  },
  headingSecondary: {
    fontWeight: '500',
    marginBottom: '15px',
    textTransform: 'uppercase',
    fontSize: '1.1rem',
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(3),
  },
  paperList: {
    marginBottom: theme.spacing(4),
  },
  textField: {
    display: 'block',
    width: '100%',
  },
  justifyBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  justifyCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  // initializations
  const classes = useStyles();
  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading && !error) {
    const cartSubtotal = cartSubtotalHelper(order.orderItems);
    order.cartSubtotalCount = cartSubtotal.cartSubtotalCount;
    order.cartSubtotalPrice = cartSubtotal.cartSubtotalPrice;
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };

      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order, history, userInfo]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const cashSuccessPaymentHandler = () => {
    dispatch(
      payOrder(orderId, {
        id: uuidv4(),
        status: 'COMPLETED',
        update_time: Date.now(),
        payer: { email_address: userInfo.email },
      })
    );
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return (
    <Paper className={classes.paper} elevation={0}>
      <Meta title='Order | Wintex' />
      {loading ? (
        <CircularLoader />
      ) : error ? (
        <Message severity='error' collapsible>
          {error}
        </Message>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
            <OrderInfo classes={classes} order={order} />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
            <OrderPayment
              classes={classes}
              order={order}
              loadingPay={loadingPay}
              sdkReady={sdkReady}
              successPaymentHandler={successPaymentHandler}
            />
            {userInfo && userInfo.isAdmin && !order.isDelivered && (
              <div style={{ marginTop: '1.5rem' }}>
                {loadingDeliver && <CircularLoader />}
                <AdminActions
                  classes={classes}
                  order={order}
                  cashSuccessPaymentHandler={cashSuccessPaymentHandler}
                  deliverHandler={deliverHandler}
                />
              </div>
            )}
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

export default OrderScreen;
