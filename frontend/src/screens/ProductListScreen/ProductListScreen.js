import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularLoader from '../../components/Loaders/CircularLoader';
import Illustration from '../../components/Illustration/Illustration';
import Message from '../../components/Message/Message';
import { listProducts } from '../../actions/productActions';
import noProductsImage from '../../static/images/web_shopping.svg';
import productRows from './data/productRows';
import productColumns from './data/productColumns';
import ProductToolbar from './components/ProductToolbar';
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_RESET,
} from '../../constants/productConstants';
import Meta from '../../components/Meta/Meta';
import GoBack from '../../components/Navigation/GoBack';
import ProductDataStates from './components/ProductDataStates';

const defaultTheme = createTheme();

const overrideTheme = createTheme({
  palette: {
    primary: {
      main: '#1a1a1a',
    },
    secondary: {
      main: green[500],
    },
  },
});

const useStyles = makeStyles(
  (theme) => {
    return {
      root: {
        '& .Mui-error': {
          backgroundColor: `rgb(126,10,15, 0.1)`,
          color: '#750f0f',
        },
      },
    };
  },
  { defaultTheme }
);

const ProductListScreen = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  // products
  const productList = useSelector((state) => state.productList);
  const { loading, error, products = [], count = 0 } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, success: successDelete } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const { loading: loadingCreate, error: errorCreate } = productCreate;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = productUpdate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push('/login');
    }

    dispatch(listProducts('', page));

    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
    }
  }, [dispatch, history, userInfo, successDelete, successUpdate, page]);

  // data-grid
  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  return (
    <>
      <GoBack history={history} />
      <Paper style={{ padding: '16px', marginTop: '12px' }}>
        <Meta title='Products | Admin | Wintex' />
        <Typography
          variant='h1'
          style={{ marginBottom: '16px' }}
          align='center'
        >
          Products
        </Typography>
        {loading ? (
          <>
            <CircularLoader />
            <p style={{ textAlign: 'center' }}>Loading...</p>
          </>
        ) : error ? (
          <Message severity='error' collapsible>
            {error}
          </Message>
        ) : products.length !== 0 ? (
          <>
            <ProductDataStates
              loadingDelete={loadingDelete}
              successDelete={successDelete}
              loadingCreate={loadingCreate}
              errorCreate={errorCreate}
              loadingUpdate={loadingUpdate}
              successUpdate={successUpdate}
              errorUpdate={errorUpdate}
            />

            <div style={{ height: 550, width: '100%' }}>
              <ThemeProvider theme={overrideTheme}>
                <DataGrid
                  className={classes.root}
                  rows={productRows(products)}
                  columns={productColumns}
                  pageSize={32}
                  rowsPerPageOptions={[32]}
                  editMode='row'
                  onRowEditStart={handleRowEditStart}
                  onRowEditStop={handleRowEditStop}
                  components={{ Toolbar: ProductToolbar }}
                  pagination
                  rowCount={count}
                  paginationMode='server'
                  onPageChange={(newPage) => setPage(newPage + 1)}
                  loading={loading}
                />
              </ThemeProvider>
            </div>
          </>
        ) : (
          <Illustration
            actionLink='#'
            actionText=''
            altText='No Products'
            heading={'No products available'}
            image={noProductsImage}
            imgHeight={225}
            imgWidth={318}
          />
        )}
      </Paper>
    </>
  );
};

export default ProductListScreen;
