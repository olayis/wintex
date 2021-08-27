import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { listProductDetails } from '../../actions/productActions';
import Message from '../../components/Message/Message';
import ProductAction from './components/ProductAction';
import ProductDetails from './components/ProductDetails';
import ProductImage from './components/ProductImage';

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGGrid: 1,
    },
    image: {
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '3px',
    },
    paper: {
      padding: theme.spacing(2),
    },
    buttonBlock: {
      display: 'block',
      width: '100%',
      marginTop: theme.spacing(2),
    },
    backLink: {
      display: 'block',
      marginBottom: theme.spacing(3),
    },
    icon: {
      verticalAlign: 'middle',
      marginRight: '5px',
    },
  }));

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Link
        component={RouterLink}
        to='/'
        underline='none'
        className={classes.backLink}
      >
        <Typography variant='button'>
          <ArrowBackIcon className={classes.icon} />
          Go Back
        </Typography>
      </Link>

      {error ? (
        <Message severity='error'>{error}</Message>
      ) : (
        <Grid container spacing={3}>
          <Grid item md={6} sm={12} xs={12}>
            <ProductImage
              loading={loading}
              image={product.image}
              alt={product.name}
              classes={classes.image}
            />
          </Grid>

          <Grid item md={3} sm={12} xs={12}>
            <ProductDetails loading={loading} product={product} />
          </Grid>

          <Grid item md={3} sm={12} xs={12}>
            <ProductAction
              loading={loading}
              classes={classes}
              product={product}
              qty={qty}
              setQty={setQty}
              addToCartHandler={addToCartHandler}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default ProductScreen;
