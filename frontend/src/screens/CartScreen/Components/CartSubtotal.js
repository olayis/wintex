import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const CartSubtotal = ({
  classes,
  cartItems,
  cartSubtotalCount,
  cartSubtotalPrice,
  checkoutHandler,
}) => {
  return (
    <Paper className={classes.paper}>
      <List aria-label='cart subtotal'>
        <ListItem>
          <Typography variant='h2'>
            Total ({cartSubtotalCount}){' '}
            {cartSubtotalCount === 1 ? 'item' : 'items'}
          </Typography>
        </ListItem>
        <Divider />

        <ListItem>
          <Typography variant='h6' className={classes.boldFont}>
            ₦{cartSubtotalPrice}
          </Typography>
        </ListItem>
        <Divider />

        <ListItem>
          <Button
            variant='contained'
            color='primary'
            size='large'
            className={classes.buttonBlock}
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            Proceed To Checkout
          </Button>
        </ListItem>
      </List>
    </Paper>
  );
};

export default CartSubtotal;
