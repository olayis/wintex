import numeral from 'numeral';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Skeleton from '@material-ui/lab/Skeleton';

const ProductAction = ({
  classes,
  loading,
  product,
  qty,
  setQty,
  addToCartHandler,
}) => {
  return (
    <List className={classes.list}>
      {loading ? (
        <>
          <Skeleton animation='wave' height='40px' />
          <Skeleton animation='wave' height='40px' />
          <Skeleton animation='wave' height='40px' />
          <Skeleton animation='wave' height='80px' />
        </>
      ) : (
        <>
          <ListItem>
            <Grid container spacing={3}>
              <Grid item xs>
                Price:
              </Grid>
              <Grid item xs>
                <strong>{numeral(product.price).format('$0,0.00')}</strong>
              </Grid>
            </Grid>
          </ListItem>

          <ListItem>
            <Grid container spacing={3}>
              <Grid item xs>
                Status:
              </Grid>
              <Grid item xs>
                {product.countInStock < 10 && product.countInStock > 0
                  ? `${product.countInStock} left`
                  : product.countInStock >= 10
                  ? `In Stock`
                  : 'Out Of Stock'}
              </Grid>
            </Grid>
          </ListItem>

          {product.countInStock > 0 && (
            <ListItem>
              <Grid container spacing={3}>
                <Grid item xs>
                  Quantity:
                </Grid>
                <Grid item xs>
                  <FormControl className={classes.formControl}>
                    <Select
                      labelId='quantity-select-label'
                      id='demo-simple-select'
                      value={qty}
                      onChange={(e) => {
                        setQty(e.target.value);
                      }}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <MenuItem value={x + 1} key={x + 1}>
                          {x + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </ListItem>
          )}

          <ListItem>
            <Button
              variant='contained'
              color='primary'
              className={classes.buttonBlock}
              disabled={product.countInStock === 0}
              onClick={addToCartHandler}
            >
              Add To Cart
            </Button>
          </ListItem>
        </>
      )}
    </List>
  );
};

export default ProductAction;
