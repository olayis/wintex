import { PayPalButton } from 'react-paypal-button-v2';
import Paper from '@material-ui/core/Paper';
import CircularLoader from '../../../components/Loaders/CircularLoader';
import OrderSummary from '../../CheckoutScreen/components/ConfirmOrder/OrderSummary';
import Illustration from '../../../components/Illustration/Illustration';
import orderConfirmedImage from '../../../static/images/order_confirmed.svg';

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
        {loadingPay && (
          <div style={{ marginBottom: '12px' }}>
            <CircularLoader />
          </div>
        )}
        {order.isPaid ? (
          <Illustration
            actionLink='/'
            actionText='Continue Shopping'
            altText='Successful Order'
            heading='Order Confirmed Successfully'
            image={orderConfirmedImage}
            imgHeight='222'
            imgWidth='300'
          />
        ) : (
          <div>
            {order.paymentMethod === 'PayPal' ||
            order.paymentMethod === 'Debit/Credit Card' ? (
              !sdkReady ? (
                <CircularLoader />
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
