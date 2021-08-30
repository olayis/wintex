import Typography from '@material-ui/core/Typography';

const OrderSummary = ({
  classes,
  cartSubtotalPrice,
  shippingPrice,
  taxPrice,
  totalPrice,
}) => {
  return (
    <div style={{ marginTop: '30px' }}>
      <div className={classes.justifyBetween}>
        <Typography variant='body2' style={{ fontWeight: '400' }}>
          Shipping
        </Typography>
        <Typography variant='body2'>
          <strong>₦{shippingPrice}</strong>
        </Typography>
      </div>

      <div className={classes.justifyBetween}>
        <Typography variant='body2' style={{ fontWeight: '400' }}>
          Tax
        </Typography>
        <Typography variant='body2'>
          <strong>₦{taxPrice}</strong>
        </Typography>
      </div>

      <div className={classes.justifyBetween}>
        <Typography variant='body2' style={{ fontWeight: '400' }}>
          Subtotal
        </Typography>
        <Typography variant='body2'>
          <strong>₦{cartSubtotalPrice}</strong>
        </Typography>
      </div>

      <div className={classes.justifyBetween}>
        <Typography variant='body1' style={{ fontWeight: '400' }}>
          Total
        </Typography>
        <Typography variant='body1'>
          <strong>₦{totalPrice}</strong>
        </Typography>
      </div>
    </div>
  );
};

export default OrderSummary;
