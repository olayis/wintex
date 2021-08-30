import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {
  saveShippingAddress,
  savePaymentMethod,
} from '../../actions/cartActions';
import { createOrder } from '../../actions/orderActions';
import CheckoutStepper from './components/CheckoutStepper/CheckoutStepper';
import Message from '../../components/Message/Message';
import CircularLoader from '../../components/Loaders/CircularLoader';
import { useEffect } from 'react';

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

const CheckoutScreen = ({ history }) => {
  // initializations
  const classes = useStyles();
  const dispatch = useDispatch();

  // cart
  const cart = useSelector((state) => state.cart);

  // order
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error, loading } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/orders/${order._id}`);
    }
  }, [history, success, order]);

  // handlers
  const onShippingSubmit = ({ address, city, postalCode, country }) => {
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
  };

  const onPaymentMethodSubmit = (paymentMethod) => {
    dispatch(savePaymentMethod(paymentMethod));
  };

  const onConfirmOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xl={3} lg={3} md={3} sm={false} xs={false}></Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Paper className={classes.paper}>
            {loading ? (
              <CircularLoader variant='indeterminate' />
            ) : error ? (
              <Message severity='error'>{error}</Message>
            ) : (
              ''
            )}
            <CheckoutStepper
              checkoutScreenClasses={classes}
              cart={cart}
              onShippingSubmit={onShippingSubmit}
              onPaymentMethodSubmit={onPaymentMethodSubmit}
              onConfirmOrder={onConfirmOrder}
            />
          </Paper>
        </Grid>
        <Grid item xl={3} lg={3} md={3} sm={false} xs={false}></Grid>
      </Grid>
    </div>
  );
};

export default CheckoutScreen;
