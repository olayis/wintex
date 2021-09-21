import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { register } from '../../actions/userActions';
import Message from '../../components/Message/Message';
import CircularLoader from '../../components/Loaders/CircularLoader';
import RegisterForm from './components/RegisterForm';
import SignUpMethods from './components/SignUpMethods';

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
  paper: {
    padding: theme.spacing(5),
  },
  textField: {
    display: 'block',
    width: '100%',
  },
}));

const RegisterScreen = ({ history, location }) => {
  // initializations
  const classes = useStyles();
  const dispatch = useDispatch();

  // user
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  // hooks
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect, dispatch]);

  // handlers
  const onSubmit = ({ name, email, password, confirmPassword }) => {
    if (password === confirmPassword) {
      dispatch(register(name, email, password));
    } else {
      setPasswordsMatch(false);
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {loading && <CircularLoader variant='indeterminate' />}
        {error && (
          <Message severity='error' collapsible>
            {error}
          </Message>
        )}

        <Typography variant='h1' className={classes.heading} align='center'>
          Sign Up
        </Typography>

        <RegisterForm
          classes={classes}
          loading={loading}
          onSubmit={onSubmit}
          passwordsMatch={passwordsMatch}
        />

        <Typography variant='subtitle2'>
          Already have an account ?{' '}
          <Link
            component={RouterLink}
            to={redirect ? `/login?redirect=${redirect}` : '/login'}
          >
            Login
          </Link>
        </Typography>

        <SignUpMethods loading={loading} />
      </Paper>
    </div>
  );
};

export default RegisterScreen;
