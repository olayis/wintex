import { PayPalButton } from 'react-paypal-button-v2';
import CircularLoader from '../../../components/Loaders/CircularLoader';
import Paper from '@material-ui/core/Paper';
import OrderSummary from '../../CheckoutScreen/components/ConfirmOrder/OrderSummary';

const OrderPayment = ({
  classes,
  order,
  loadingPay,
  sdkReady,
  successPaymentHandler,
}) => {
  return (
    <Paper className={`${classes.paper} ${classes.paperList}`} elevation={2}>
      <OrderSummary
        classes={classes}
        cartSubtotalPrice={order.cartSubtotalPrice}
        shippingPrice={order.shippingPrice}
        taxPrice={order.taxPrice}
        totalPrice={order.totalPrice}
      />

      <div style={{ marginTop: '1.5rem' }}>
        {!order.isPaid && (
          <div>
            {loadingPay && (
              <div style={{ marginBottom: '12px' }}>
                <CircularLoader variant='indeterminate' />
              </div>
            )}
            {order.paymentMethod === 'PayPal' ||
            order.paymentMethod === 'Debit/Credit Card' ? (
              !sdkReady ? (
                <CircularLoader variant='indeterminate' />
              ) : (
                <PayPalButton
                  amount={order.totalPrice}
                  onSuccess={successPaymentHandler}
                />
              )
            ) : (
              ''
            )}
          </div>
        )}
      </div>
    </Paper>
  );
};

export default OrderPayment;
