import Message from '../../../components/Message/Message';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
  PayPalIcon,
  CreditCardIcon,
  PaymentMethodIcon,
} from '../../../utils/customIcons';

const PaymentMethod = ({ classes, order }) => {
  return (
    <Paper className={`${classes.paper} ${classes.paperList}`} elevation={0}>
      <Typography
        variant='h2'
        align='center'
        className={classes.headingSecondary}
      >
        Payment Method
      </Typography>
      <div className={classes.justifyCenter}>
        {order.paymentMethod === 'PayPal'
          ? PayPalIcon
          : order.paymentMethod === 'Debit/Credit Card'
          ? CreditCardIcon
          : order.paymentMethod === 'Cash On Delivery'
          ? PaymentMethodIcon
          : ''}
      </div>
      <Typography align='center'>{order.paymentMethod}</Typography>

      <div style={{ marginTop: '12px' }}>
        {order.isPaid ? (
          <Message severity='success'>Paid on {order.paidAt}</Message>
        ) : (
          <Message severity='info'>Not paid</Message>
        )}
      </div>
    </Paper>
  );
};

export default PaymentMethod;
