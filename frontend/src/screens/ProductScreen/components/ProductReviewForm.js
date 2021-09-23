import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import CommentIcon from '@material-ui/icons/Comment';
import { createProductReview } from '../../../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../../constants/productConstants';
import CircularLoader from '../../../components/Loaders/CircularLoader';
import Message from '../../../components/Message/Message';
import RatingFeedback from '../../../components/Rating/RatingFeedback';

const ProductReviewForm = ({ paramsId }) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState({ text: '', severity: '' });

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReiew,
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successProductReview) {
      setMessage({ text: 'Review submitted', severity: 'success' });
      setRating(0);
      setComment('');
      setMessage({ text: '', severity: '' });
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, successProductReview]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (rating && comment) {
      dispatch(
        createProductReview(paramsId, {
          rating,
          comment,
        })
      );
    } else {
      setMessage({ text: 'Please, fill all fields', severity: 'error' });
    }
  };

  return (
    <div>
      <div>
        <Typography variant='h3' align='center'>
          Write a customer review
        </Typography>
        {userInfo ? (
          <>
            <div style={{ margin: '1rem 0' }}>
              {loadingProductReiew && <CircularLoader />}
              {message.text && (
                <Message severity={message.severity} collapsible>
                  {message.text}
                </Message>
              )}
              {errorProductReview && (
                <Message severity='error' collapsible>
                  {errorProductReview}
                </Message>
              )}
            </div>

            <form onSubmit={submitHandler}>
              <RatingFeedback value={rating} setValue={setRating} />
              <div style={{ margin: '0.9rem 0 1.5rem' }}>
                <TextField
                  variant='filled'
                  label='Comment'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  type='text'
                  multiline
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <CommentIcon color='action' />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type='submit' variant='contained' color='primary'>
                  Submit Review
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div style={{ marginTop: '1rem' }}>
            <Typography
              variant='subtitle1'
              align='center'
              color='textSecondary'
            >
              <Link
                component={RouterLink}
                to='/login'
                style={{ color: '#2196f3' }}
              >
                Sign in
              </Link>{' '}
              to write a review
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviewForm;
