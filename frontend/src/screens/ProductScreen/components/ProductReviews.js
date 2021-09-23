import { useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import RateReviewIcon from '@material-ui/icons/RateReview';
import Divider from '@material-ui/core/Divider';

const ProductReviews = ({ classes }) => {
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;

  return (
    <>
      {product.reviews.length === 0 ? (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '1.4rem',
            }}
          >
            <RateReviewIcon style={{ fontSize: 70 }} color='disabled' />
          </div>
          <Typography variant='body1' align='center' color='textSecondary'>
            No Reviews
          </Typography>
        </>
      ) : (
        <List className={classes.list}>
          {product.reviews.map((review) => (
            <div key={review._id}>
              <ListItem>
                <strong>{review.name}</strong>
              </ListItem>
              <ListItem style={{ marginTop: '-12px' }}>
                <Rating name='product-rating' value={review.rating} readOnly />
              </ListItem>
              <ListItem style={{ marginTop: '-25px' }}>
                <p>{review.comment}</p>
              </ListItem>
              <ListItem style={{ marginTop: '-35px' }}>
                <p style={{ fontSize: '0.85rem', fontStyle: 'italic' }}>
                  {review.createdAt.substring(0, 10)}
                </p>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      )}
    </>
  );
};

export default ProductReviews;
