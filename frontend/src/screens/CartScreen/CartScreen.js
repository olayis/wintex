import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import cartSubtotalHelper from '../../helpers/cartSubtotalHelper';
import CartItems from './components/CartItems';
import CartSubtotal from './components/CartSubtotal';
import CartEmpty from './components/CartEmpty';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
  boldFont: {
    fontWeight: '700',
  },
  buttonBlock: {
    display: 'block',
    width: '100%',
    marginTop: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  image: {
    width: '100%',
    height: 'auto',
  },
}));

const CartScreen = ({ match, location, history }) => {
  const dispatch = useDispatch();

  // product
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  // cart
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { cartSubtotalCount, cartSubtotalPrice } =
    cartSubtotalHelper(cartItems);

  // hooks
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  // handlers
  const addToCartHandler = (product, value) => {
    dispatch(addToCart(product, value));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant='h1' className={classes.title}>
        Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <CartEmpty />
      ) : (
        <Grid container spacing={3}>
          <Grid item md={9}>
            <CartItems
              classes={classes}
              cartItems={cartItems}
              addToCartHandler={addToCartHandler}
              removeFromCartHandler={removeFromCartHandler}
            />
          </Grid>

          <Grid item md={3} sm={12} xs={12}>
            <CartSubtotal
              classes={classes}
              cartItems={cartItems}
              cartSubtotalCount={cartSubtotalCount}
              cartSubtotalPrice={cartSubtotalPrice}
              checkoutHandler={checkoutHandler}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default CartScreen;
