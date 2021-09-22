import numeral from 'numeral';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Skeleton from '@material-ui/lab/Skeleton';

const ProductDetails = ({ loading, product }) => {
  return (
    <List>
      {loading ? (
        <>
          <Skeleton animation='wave' height='40px' />
          <Skeleton animation='wave' width='90%' height='30px' />
          <Skeleton animation='wave' width='70%' height='30px' />
          <Skeleton animation='wave' height='150px' />
        </>
      ) : (
        <>
          <ListItem>
            <Typography variant='h3'>{product.name}</Typography>
          </ListItem>
          <ListItem style={{ marginTop: '-12px' }}>
            <Typography variant='overline'>Brand: {product.brand}</Typography>
          </ListItem>
          <ListItem divider style={{ marginTop: '-25px' }}>
            <Typography variant='overline'>
              Category: {product.category}
            </Typography>
          </ListItem>
          <ListItem divider>
            <Rating name='product-rating' value={product.rating} readOnly />
            <Typography
              variant='body2'
              color='textSecondary'
              style={{ margin: '3px 0 0 8px' }}
            >
              {`${product.numReviews} ${
                product.numReviews === 1 ? 'review' : 'reviews'
              }`}
            </Typography>
          </ListItem>
          <ListItem divider>
            <Typography variant='subtitle1'>
              Price: {numeral(product.price).format('$0,0.00')}
            </Typography>
          </ListItem>
          <ListItem divider>
            <Typography variant='body2'>
              Description: {product.description}
            </Typography>
          </ListItem>
        </>
      )}
    </List>
  );
};

export default ProductDetails;
