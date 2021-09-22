import { useEffect } from 'react';
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

  // products
  const productList = useSelector((state) => state.productList);
  const { loading, error, products = [] } = productList;

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

    dispatch(listProducts());

    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
    }
  }, [dispatch, history, userInfo, successDelete, successUpdate]);

  // data-grid
  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  return (
    <Paper style={{ padding: '16px', marginTop: '12px' }}>
      <Typography variant='h1' style={{ marginBottom: '16px' }} align='center'>
        Products
      </Typography>
      {loading ? (
        <>
          <CircularLoader variant='indeterminate' />
          <p style={{ textAlign: 'center' }}>Loading...</p>
        </>
      ) : error ? (
        <Message severity='error' collapsible>
          {error}
        </Message>
      ) : products.length !== 0 ? (
        <>
          <div style={{ marginBottom: '8px' }}>
            <div style={{ marginBottom: '5px' }}>
              {loadingDelete && (
                <>
                  <CircularLoader variant='indeterminate' />
                  <p style={{ textAlign: 'center' }}>Deleting...</p>
                </>
              )}
              {successDelete && (
                <Message severity='success' collapsible>
                  Product has been deleted successfully
                </Message>
              )}
            </div>

            <div style={{ marginBottom: '5px' }}>
              {loadingCreate && (
                <>
                  <CircularLoader variant='indeterminate' />
                  <p style={{ textAlign: 'center' }}>
                    Creating a new product...
                  </p>
                </>
              )}
              {errorCreate && (
                <Message severity='error' collapsible>
                  {errorCreate}
                </Message>
              )}
            </div>

            <div style={{ marginBottom: '5px' }}>
              {loadingUpdate && (
                <>
                  <CircularLoader variant='indeterminate' />
                  <p style={{ textAlign: 'center' }}>Updating...</p>
                </>
              )}
              {successUpdate && (
                <Message severity='success' collapsible>
                  Order has been updated successfully
                </Message>
              )}
              {errorUpdate && (
                <Message severity='error' collapsible>
                  {errorUpdate}
                </Message>
              )}
            </div>
          </div>

          <div style={{ height: 550, width: '100%' }}>
            <ThemeProvider theme={overrideTheme}>
              <DataGrid
                className={classes.root}
                rows={productRows(products)}
                columns={productColumns}
                pageSize={20}
                rowsPerPageOptions={[20]}
                editMode='row'
                onRowEditStart={handleRowEditStart}
                onRowEditStop={handleRowEditStop}
                components={{ Toolbar: ProductToolbar }}
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
  );
};

export default ProductListScreen;
