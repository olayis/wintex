import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import cartSubtotalHelper from '../../../../helpers/cartSubtotalHelper';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';
import {
  PayPalIcon,
  StripeIcon,
  CreditCardIcon,
  PaymentMethodIcon,
} from '../../../../utils/customIcons';
import Illustration from '../../../../components/Illustration/Illustration';
import addToCartImage from '../../../../static/images/add_to_cart.svg';

const ConfirmOrder = ({
  classes,
  cart,
  handleReset,
  goToShippingStep,
  goToPaymentMethodStep,
  onConfirmOrder,
}) => {
  // cart
  const { cartItems, shippingAddress, paymentMethod } = cart;
  const { cartSubtotalCount, cartSubtotalPrice } =
    cartSubtotalHelper(cartItems);

  cart.shippingPrice =
    cartSubtotalPrice >= 100000
      ? 0
      : cartSubtotalCount <= 5
      ? 800
      : cartSubtotalCount <= 10
      ? 1300
      : 1500;
  cart.taxPrice = Number((0.15 * cartSubtotalPrice).toFixed(2));

  cart.totalPrice =
    Number(cartSubtotalPrice) + cart.shippingPrice + cart.taxPrice;

  // handlers
  const handleConfirmOrder = () => {
    onConfirmOrder();
    handleReset();
  };
  return (
    <Paper className={classes.paper} elevation={0}>
      <Typography variant='h1' className={classes.heading} align='center'>
        Confirm Order
      </Typography>

      <Paper className={`${classes.paper} ${classes.paperList}`} elevation={2}>
        <Typography
          variant='h2'
          align='center'
          className={classes.headingSecondary}
        >
          Shipping Address
        </Typography>
        <Typography align='center'>{`${shippingAddress.address}, ${shippingAddress.city} ${shippingAddress.postalCode}, ${shippingAddress.country}.`}</Typography>

        <Button variant='outlined' color='primary' onClick={goToShippingStep}>
          Change Shipping Address
        </Button>
      </Paper>

      <Paper className={`${classes.paper} ${classes.paperList}`} elevation={2}>
        <Typography
          variant='h2'
          align='center'
          className={classes.headingSecondary}
        >
          Payment Method
        </Typography>
        <div className={classes.justifyCenter}>
          {paymentMethod === 'PayPal'
            ? PayPalIcon
            : paymentMethod === 'Stripe'
            ? StripeIcon
            : paymentMethod === 'Debit/Credit Card'
            ? CreditCardIcon
            : paymentMethod === 'Cash On Delivery'
            ? PaymentMethodIcon
            : ''}
        </div>
        <Typography align='center'>{paymentMethod}</Typography>
        <Button
          variant='outlined'
          color='primary'
          onClick={goToPaymentMethodStep}
        >
          Change Payment Method
        </Button>
      </Paper>

      <Paper className={`${classes.paper} ${classes.paperList}`} elevation={2}>
        <Typography
          variant='h2'
          align='center'
          className={classes.headingSecondary}
        >
          {cartItems.length === 1 ? 'Your Order' : 'Your Orders'} (
          {cartSubtotalCount} {cartSubtotalCount === 1 ? 'item' : 'items'})
        </Typography>

        {cartItems.length === 0 ? (
          <Illustration
            actionLink='/'
            actionText='Add products to cart'
            altText='Empty Cart'
            heading='Your cart is empty.'
            image={addToCartImage}
            imgHeight='289'
            imgWidth='385'
          />
        ) : (
          <div>
            <Hidden smDown>
              <Grid container spacing={2} style={{ marginBottom: '10px' }}>
                <Grid item sm={6}>
                  <Typography
                    align='center'
                    color='textSecondary'
                    variant='body2'
                  >
                    Product
                  </Typography>
                </Grid>

                <Grid item sm={1}>
                  <Typography color='textSecondary' variant='body2'>
                    Qty
                  </Typography>
                </Grid>

                <Grid item sm={2}>
                  <Typography color='textSecondary' variant='body2'>
                    Price
                  </Typography>
                </Grid>

                <Grid item sm={3}>
                  <Typography color='textSecondary' variant='body2'>
                    Subtotal
                  </Typography>
                </Grid>
              </Grid>
            </Hidden>
            <Divider style={{ marginBottom: '8px' }} />

            <div>
              {cartItems.map((item, index) => (
                <CartItem item={item} key={index} />
              ))}
            </div>

            <OrderSummary
              classes={classes}
              cartSubtotalPrice={cartSubtotalPrice}
              shippingPrice={cart.shippingPrice}
              taxPrice={cart.taxPrice}
              totalPrice={cart.totalPrice}
            />

            <Link component={RouterLink} to='/cart' underline='none'>
              <Button variant='outlined' color='primary'>
                Modify Cart
              </Button>
            </Link>
          </div>
        )}
      </Paper>

      <Button
        onClick={handleConfirmOrder}
        variant='contained'
        color='primary'
        disabled={cartSubtotalCount === 0}
      >
        Confirm Order
      </Button>
    </Paper>
  );
};

export default ConfirmOrder;
