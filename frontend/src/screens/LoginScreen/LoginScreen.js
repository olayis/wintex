import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { login } from '../../actions/userActions';
import Message from '../../components/Message/Message';
import CircularLoader from '../../components/Loaders/CircularLoader';
import LoginForm from './components/LoginForm';
import SignInMethods from './components/SignInMethods';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },

    '& .MuiButtonBase-root': {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      width: '100%',
    },
    '& .MuiInputBase-root': {
      width: '95%',
    },
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
  forgotPassword: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(5),
  },
  textField: {
    display: 'block',
    width: '100%',
  },
}));

const LoginScreen = ({ history, location }) => {
  // initializations
  const classes = useStyles();
  const dispatch = useDispatch();

  // user
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect, dispatch]);

  // handlers
  const onSubmit = ({ email, password }) => {
    dispatch(login(email, password));
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {loading && <CircularLoader />}
        {error && (
          <Message severity='error' collapsible>
            {error}
          </Message>
        )}

        <Typography variant='h1' className={classes.heading} align='center'>
          Sign In
        </Typography>

        <LoginForm classes={classes} loading={loading} onSubmit={onSubmit} />

        <Typography variant='subtitle2'>
          Don't have an account ?{' '}
          <Link
            component={RouterLink}
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
          >
            Register
          </Link>
        </Typography>

        <SignInMethods loading={loading} />
      </Paper>
    </div>
  );
};

export default LoginScreen;
