import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { getOrderDetails, payOrder } from '../../actions/orderActions';
import CircularLoader from '../../components/Loaders/CircularLoader';
import Message from '../../components/Message/Message';
import cartSubtotalHelper from '../../helpers/cartSubtotalHelper';
import { ORDER_PAY_RESET } from '../../constants/orderConstants';
import OrderInfo from './components/OrderInfo';
import OrderPayment from './components/OrderPayment';

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

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;

  // initializations
  const classes = useStyles();
  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading && !error) {
    const cartSubtotal = cartSubtotalHelper(order.orderItems);
    order.cartSubtotalCount = cartSubtotal.cartSubtotalCount;
    order.cartSubtotalPrice = cartSubtotal.cartSubtotalPrice;
  }

  useEffect(() => {
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

    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  return (
    <Paper className={classes.paper} elevation={0}>
      {loading ? (
        <CircularLoader variant='indeterminate' />
      ) : error ? (
        <Message severity='error'>{error}</Message>
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
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

export default OrderScreen;
