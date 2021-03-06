import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import numeral from 'numeral';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import CircularLoader from '../../../components/Loaders/CircularLoader';
import Message from '../../../components/Message/Message';
import Illustration from '../../../components/Illustration/Illustration';
import emptyOrderImage from '../../../static/images/empty_order.svg';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const UserOrders = ({ classes, orders, loadingOrders, errorOrders }) => {
  const tableClasses = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant='h2' className={classes.heading} align='center'>
        My Orders
      </Typography>
      {loadingOrders ? (
        <CircularLoader />
      ) : errorOrders ? (
        <Message severity='error' collapsible>
          {errorOrders}
        </Message>
      ) : orders.length === 0 ? (
        <Illustration
          actionLink='/cart'
          actionText='Checkout and place orders'
          altText='No Orders'
          heading={"You don't have any orders."}
          image={emptyOrderImage}
          imgHeight={240}
          imgWidth={300}
        />
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table
              size='small'
              className={tableClasses.table}
              aria-label='customized table'
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell align='center'>ID</StyledTableCell>
                  <StyledTableCell align='left'>Date</StyledTableCell>
                  <StyledTableCell align='right'>Total</StyledTableCell>
                  <StyledTableCell align='center'>Paid</StyledTableCell>
                  <StyledTableCell align='center'>Delivered</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order) => (
                    <StyledTableRow key={order._id}>
                      <StyledTableCell
                        component='th'
                        scope='row'
                        align='center'
                      >
                        <Link
                          component={RouterLink}
                          to={`/orders/${order._id}`}
                        >
                          {order._id}
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell align='left'>
                        {order.createdAt.substring(0, 10)}
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        {numeral(order.totalPrice).format('$0,0.00')}
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <CloseIcon color='action' />
                        )}
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <CloseIcon color='action' />
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component='div'
            count={orders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Paper>
  );
};

export default UserOrders;
