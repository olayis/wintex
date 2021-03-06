import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { listProducts } from '../../actions/productActions';
import Typography from '@material-ui/core/Typography';
import Message from '../../components/Message/Message';
import Paginate from '../../components/Paginate/Paginate';
import Product from '../../components/Product/Product';
import ProductSkeleton from '../../components/Product/ProductSkeleton';
import Illustration from '../../components/Illustration/Illustration';
import searchImage from '../../static/images/searching.svg';
import ProductCarousel from '../../components/Product/ProductCarousel';
import Skeleton from '@material-ui/lab/Skeleton';
import Meta from '../../components/Meta/Meta';
import GoBack from '../../components/Navigation/GoBack';

const HomeScreen = ({ match, history }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products = [], count, pages, page } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {keyword ? (
        <GoBack history={history} />
      ) : pageNumber !== 1 ? (
        ''
      ) : (
        <ProductCarousel />
      )}
      {loading ? (
        <>
          {keyword ? (
            <Skeleton
              animation='wave'
              width='20%'
              height='30px'
              style={{ marginLeft: '12px' }}
            />
          ) : (
            <Skeleton
              animation='wave'
              width='20%'
              height='30px'
              style={{ margin: '0 auto' }}
            />
          )}
          <Grid container spacing={2}>
            {[...Array(12).keys()].map((x) => (
              <Grid item key={x + 1} xs={12} sm={6} md={4} lg={3} xl={2}>
                <ProductSkeleton />
              </Grid>
            ))}
          </Grid>
        </>
      ) : error ? (
        <>
          <Typography variant='h2' align='center'>
            Latest Products
          </Typography>
          <Message severity='error' collapsible>
            {error}
          </Message>
        </>
      ) : (
        <>
          {keyword ? (
            <Typography
              variant='overline'
              style={{ margin: '5px 0 0 16px', fontSize: '0.95rem' }}
              component='h1'
            >
              {count} products found
            </Typography>
          ) : (
            <Typography variant='h2' align='center'>
              Latest Products
            </Typography>
          )}
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                <Product product={product} />
              </Grid>
            ))}
          </Grid>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
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
