import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const UserOrders = ({ classes }) => {
  return (
    <Paper className={classes.paper}>
      <Typography variant='h2' className={classes.heading} align='center'>
        My Orders
      </Typography>
    </Paper>
  );
};

export default UserOrders;
