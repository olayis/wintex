import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { listProducts } from '../../actions/productActions';
import { loadScreen, loadedScreen } from '../../actions/screenActions';
import { Typography } from '@material-ui/core';
import Message from '../../components/Message/Message';
import Product from '../../components/Product/Product';
import ProductSkeleton from '../../components/Product/ProductSkeleton';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(loadedScreen());
    dispatch(listProducts());

    return () => {
      dispatch(loadScreen());
    };
  }, [dispatch]);

  return (
    <>
      <Typography variant='h1'>Latest Products</Typography>
      {loading ? (
        <Grid container spacing={3}>
          {[...Array(12).keys()].map((x) => (
            <Grid item key={x + 1} xs={12} sm={6} md={4} lg={3} xl={2}>
              <ProductSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : error ? (
        <Message severity='error'>{error}</Message>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3} xl={2}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default HomeScreen;
