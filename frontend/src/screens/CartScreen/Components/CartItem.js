import numeral from 'numeral';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';

const CartItem = ({
  item,
  classes,
  addToCartHandler,
  removeFromCartHandler,
}) => {
  return (
    <ListItem divider>
      <Grid container spacing={3}>
        <Grid item md={2} sm={12}>
          <Avatar
            src={item.image}
            alt={item.name}
            variant='rounded'
            className={classes.image}
          />
        </Grid>

        <Grid item md={4} sm={12} xs={12}>
          <Link component={RouterLink} to={`/product/${item.product}`}>
            {item.name}
          </Link>
        </Grid>

        <Grid item md={2} sm xs={6}>
          <Typography variant='body2'>
            <Hidden smUp>Price: </Hidden>
            {numeral(item.price).format('$0,0.00')}
          </Typography>
        </Grid>

        <Grid item md={1} sm xs={6}>
          <Hidden smUp>
            <Typography
              variant='body2'
              style={{ display: 'inline-block', margin: '5px 5px 0 0' }}
            >
              Qty:
            </Typography>
          </Hidden>
          <FormControl className={classes.formControl}>
            <Select
              labelId='quantity-select-label'
              id='quantity-select'
              value={item.qty}
              style={{ fontSize: '.9rem' }}
              onChange={(e) =>
                addToCartHandler(item.product, Number(e.target.value))
              }
            >
              {[...Array(item.countInStock).keys()].map((x) => (
                <MenuItem value={x + 1} key={x + 1}>
                  {x + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={2} sm xs>
          <Hidden smUp>Subtotal: </Hidden>
          <Typography variant='body1' display='inline'>
            {numeral((item.price * item.qty).toFixed(2)).format('$0,0.00')}
          </Typography>
        </Grid>

        <Grid item md={1} sm xs>
          <IconButton
            aria-label='delete'
            style={{ marginTop: '-8px' }}
            onClick={() => removeFromCartHandler(item.product)}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default CartItem;
