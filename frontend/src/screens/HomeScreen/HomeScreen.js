import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { listProducts } from '../../actions/productActions';
import { Typography } from '@material-ui/core';
import Message from '../../components/Message/Message';
import Product from '../../components/Product/Product';
import ProductSkeleton from '../../components/Product/ProductSkeleton';
import Illustration from '../../components/Illustration/Illustration';
import searchImage from '../../static/images/searching.svg';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products = [] } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <Typography variant='h1'>Latest Products</Typography>
      {loading ? (
        <Grid container spacing={2}>
          {[...Array(12).keys()].map((x) => (
            <Grid item key={x + 1} xs={12} sm={6} md={4} lg={3} xl={2}>
              <ProductSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : error ? (
        <Message severity='error' collapsible>
          {error}
        </Message>
      ) : (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3} xl={2}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      )}
      {keyword && !loading && !error && products.length === 0 && (
        <div style={{ marginTop: '1.8rem' }}>
          <Illustration
            actionLink='/'
            actionText='Go to homepage'
            altText='Searching for product'
            heading={`There are no results for "${keyword}".`}
            infoText='check your spelling or try searching with other keywords.'
            image={searchImage}
            imgHeight='214'
            imgWidth='300'
          />
        </div>
      )}
    </>
  );
};

export default HomeScreen;
