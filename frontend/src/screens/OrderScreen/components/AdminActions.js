import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const AdminActions = ({
  classes,
  order,
  cashSuccessPaymentHandler,
  deliverHandler,
}) => {
  return (
    <>
      {order.paymentMethod === 'Cash On Delivery' && !order.isPaid && (
        <Paper
          className={`${classes.paper} ${classes.paperList}`}
          elevation={2}
        >
          <div className={classes.justifyCenter}>
            <Button
              variant='contained'
              color='primary'
              onClick={cashSuccessPaymentHandler}
            >
              Confirm Cash Payment
            </Button>
          </div>
        </Paper>
      )}
      {order.isPaid && !order.isDelivered && (
        <Paper
          className={`${classes.paper} ${classes.paperList}`}
          elevation={2}
        >
          <div className={classes.justifyCenter}>
            <Button
              variant='contained'
              color='primary'
              onClick={deliverHandler}
            >
              Mark As Delivered
            </Button>
          </div>
        </Paper>
      )}
    </>
  );
};

export default AdminActions;
