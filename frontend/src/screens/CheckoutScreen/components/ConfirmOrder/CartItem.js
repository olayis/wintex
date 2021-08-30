import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';

const CartItem = ({ item }) => {
  return (
    <div style={{ marginBottom: '8px' }}>
      <Link
        component={RouterLink}
        to={`/product/${item.product}`}
        underline='none'
      >
        <Grid container spacing={2}>
          <Grid item sm={2} xs={12}>
            <img
              src={item.image}
              alt={item.name}
              style={{ width: '100%', height: 'auto' }}
            />
          </Grid>

          <Grid item sm={4} xs={12}>
            <Typography variant='body2'>{item.name}</Typography>
          </Grid>

          <Grid item sm={1} xs={2}>
            <Typography variant='body2'>
              <Hidden smUp>Qty: </Hidden>
              {item.qty}
            </Typography>
          </Grid>

          <Grid item sm={2} xs={4}>
            <Typography variant='body2'>
              <Hidden smUp>Price: </Hidden>₦{item.price}
            </Typography>
          </Grid>

          <Grid item sm={3} xs={6}>
            <Typography variant='body2'>
              <Hidden smUp>Subtotal: </Hidden>
              <strong>₦{item.qty * item.price}</strong>
            </Typography>
          </Grid>
        </Grid>
      </Link>
      <Divider />
    </div>
  );
};

export default CartItem;
