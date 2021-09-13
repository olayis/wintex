import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import OrderItems from './OrderItems';
import PaymentMethod from './PaymentMethod';
import ShippingDetails from './ShippingDetails';

const OrderInfo = ({ classes, order }) => {
  return (
    <Paper className={`${classes.paper} ${classes.paperList}`} elevation={2}>
      <Typography
        variant='h1'
        className={classes.heading}
        align='center'
        noWrap
      >
        Order {order._id}
      </Typography>

      <ShippingDetails classes={classes} order={order} />
      <Divider variant='middle' />

      <PaymentMethod classes={classes} order={order} />
      <Divider variant='middle' />

      <OrderItems classes={classes} order={order} />
    </Paper>
  );
};

export default OrderInfo;
