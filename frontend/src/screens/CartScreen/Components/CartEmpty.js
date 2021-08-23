import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import emptyCartImage from '../../../static/images/empty_cart.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
  },
  title: {
    marginTop: theme.spacing(2),
    display: 'block',
    textAlign: 'center',
  },
  link: {
    marginTop: theme.spacing(1),
    display: 'block',
    textAlign: 'center',
    fontWeight: '500',
    color: theme.palette.info.main,
  },
}));

const CartEmpty = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <img
          src={emptyCartImage}
          alt='Empty Cart'
          width='300'
          height='240'
          className={classes.image}
        />
        <Typography
          variant={'h2'}
          color='textSecondary'
          className={classes.title}
        >
          Your Cart is Empty.
        </Typography>
        <Link component={RouterLink} to='/' className={classes.link}>
          Start Shopping
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty;
