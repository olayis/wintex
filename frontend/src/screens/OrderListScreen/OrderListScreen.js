import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { green } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularLoader from '../../components/Loaders/CircularLoader';
import Illustration from '../../components/Illustration/Illustration';
import Message from '../../components/Message/Message';
import { listOrders } from '../../actions/orderActions';
import noOrdersImage from '../../static/images/empty_order.svg';
import orderRows from './data/orderRows';
import orderColumns from './data/orderColumns';

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

const OrderListScreen = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // orders
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders = [] } = orderList;

  // user
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  return (
    <Paper style={{ padding: '16px', marginTop: '12px' }}>
      <Typography variant='h1' style={{ marginBottom: '16px' }} align='center'>
        Orders
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
      ) : orders.length !== 0 ? (
        <div style={{ height: 550, width: '100%' }}>
          <ThemeProvider theme={overrideTheme}>
            <DataGrid
              className={classes.root}
              rows={orderRows(orders)}
              columns={orderColumns}
              pageSize={20}
              rowsPerPageOptions={[20]}
            />
          </ThemeProvider>
        </div>
      ) : (
        <Illustration
          actionLink='#'
          actionText=''
          altText='No Orders'
          heading='No orders to display'
          image={noOrdersImage}
          imgHeight={273}
          imgWidth={300}
        />
      )}
    </Paper>
  );
};

export default OrderListScreen;
