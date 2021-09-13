import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CartItem from '../../CheckoutScreen/components/ConfirmOrder/CartItem';
import Illustration from '../../../components/Illustration/Illustration';
import emptyOrderImage from '../../../static/images/empty_order.svg';

const OrderItems = ({ classes, order }) => {
  return (
    <Paper className={`${classes.paper} ${classes.paperList}`} elevation={0}>
      <Typography
        variant='h2'
        align='center'
        className={classes.headingSecondary}
      >
        {order.orderItems.length === 1 ? 'Your Order' : 'Your Orders'} (
        {order.cartSubtotalCount}{' '}
        {order.cartSubtotalCount === 1 ? 'item' : 'items'})
      </Typography>

      {order.orderItems.length === 0 ? (
        <Illustration
          actionLink='/cart'
          actionText='Checkout and place orders'
          altText='No Orders'
          heading={"You don't have any orders."}
          image={emptyOrderImage}
          imgHeight={240}
          imgWidth={300}
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
            {order.orderItems.map((item, index) => (
              <CartItem item={item} key={index} />
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default OrderItems;
