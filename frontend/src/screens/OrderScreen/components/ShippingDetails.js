import Link from '@material-ui/core/Link';
import Message from '../../../components/Message/Message';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const ShippingDetails = ({ classes, order }) => {
  return (
    <Paper className={`${classes.paper} ${classes.paperList}`} elevation={0}>
      <Typography
        variant='h2'
        align='center'
        className={classes.headingSecondary}
      >
        Shipping Details
      </Typography>
      <Typography align='center'>Name: {order.user.name}</Typography>
      <Typography align='center'>
        Email:{' '}
        <Link href={`mailto:${order.user.email}`}>{order.user.email}</Link>
      </Typography>
      <Typography align='center'>
        Address:{' '}
        {`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.country} (${order.shippingAddress.postalCode}).`}
      </Typography>
      <div style={{ marginTop: '12px' }}>
        {order.isDelivered ? (
          <Message severity='success'>Delivered on {order.deliveredAt}</Message>
        ) : (
          <Message severity='info'>Not Delivered</Message>
        )}
      </div>
    </Paper>
  );
};

export default ShippingDetails;
