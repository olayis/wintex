import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CartItem from './CartItem';

const CartItems = ({
  classes,
  cartItems,
  addToCartHandler,
  removeFromCartHandler,
}) => {
  return (
    <Paper className={classes.paper}>
      <List className={classes.list}>
        <Hidden smDown>
          <ListItem divider>
            <Grid container spacing={3}>
              <Grid item md={6}>
                <Typography variant='subtitle2'>Item</Typography>
              </Grid>
              <Grid item md={2} sm={12}>
                <Typography variant='subtitle2'>Price</Typography>
              </Grid>
              <Grid item md={1}>
                <Typography variant='subtitle2'>Quantity</Typography>
              </Grid>
              <Grid item md={2}>
                <Typography variant='subtitle2'>Subtotal</Typography>
              </Grid>
              <Grid item md={1}>
                <Typography variant='subtitle2'>Remove</Typography>
              </Grid>
            </Grid>
          </ListItem>
        </Hidden>
        {cartItems.map((item) => (
          <CartItem
            key={item.product}
            item={item}
            classes={classes}
            addToCartHandler={addToCartHandler}
            removeFromCartHandler={removeFromCartHandler}
          />
        ))}
      </List>
    </Paper>
  );
};

export default CartItems;
