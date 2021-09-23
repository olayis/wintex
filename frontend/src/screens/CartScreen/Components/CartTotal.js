import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import numeral from 'numeral';

const CartTotal = ({
  classes,
  cartItems,
  cartSubtotalCount,
  cartSubtotalPrice,
  checkoutHandler,
  continueShoppingHandler,
}) => {
  return (
    <Paper className={classes.paper}>
      <List aria-label='cart subtotal'>
        <ListItem>
          <Typography variant='h2'>
            Subtotal ({cartSubtotalCount}){' '}
            {cartSubtotalCount === 1 ? 'item' : 'items'}
          </Typography>
        </ListItem>
        <Divider />

        <ListItem>
          <Typography variant='h6' className={classes.boldFont}>
            {numeral(cartSubtotalPrice).format('$0,0.00')}
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

        <ListItem>
          <Button
            variant='outlined'
            color='primary'
            size='large'
            className={classes.buttonBlock}
            style={{
              marginTop: '5px',
            }}
            onClick={continueShoppingHandler}
          >
            Continue Shopping
          </Button>
        </ListItem>
      </List>
    </Paper>
  );
};

export default CartTotal;
