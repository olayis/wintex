import Typography from '@material-ui/core/Typography';
import numeral from 'numeral';

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
          <strong>{numeral(shippingPrice).format('$0,0.00')}</strong>
        </Typography>
      </div>

      <div className={classes.justifyBetween}>
        <Typography variant='body2' style={{ fontWeight: '400' }}>
          Tax
        </Typography>
        <Typography variant='body2'>
          <strong>{numeral(taxPrice).format('$0,0.00')}</strong>
        </Typography>
      </div>

      <div className={classes.justifyBetween}>
        <Typography variant='body2' style={{ fontWeight: '400' }}>
          Subtotal
        </Typography>
        <Typography variant='body2'>
          <strong>{numeral(cartSubtotalPrice).format('$0,0.00')}</strong>
        </Typography>
      </div>

      <div className={classes.justifyBetween}>
        <Typography variant='body1' style={{ fontWeight: '400' }}>
          Total
        </Typography>
        <Typography variant='body1'>
          <strong>{numeral(totalPrice).format('$0,0.00')}</strong>
        </Typography>
      </div>
    </div>
  );
};

export default OrderSummary;
