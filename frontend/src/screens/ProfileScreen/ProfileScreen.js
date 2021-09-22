import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { green } from '@material-ui/core/colors';
import { getUserDetails, updateUserProfile } from '../../actions/userActions';
import { listMyOrders } from '../../actions/orderActions';
import UserDetails from './components/UserDetails';
import UserOrders from './components/UserOrders';
import Meta from '../../components/Meta/Meta';

const useStyles = makeStyles((theme) => ({
  root: {
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
    '& .MuiTablePagination-toolbar': {
      width: '15%',
    },
    '& .MuiTablePagination-actions': {
      display: 'inline-flex',
    },
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(3),
  },
  textField: {
    display: 'block',
    width: '100%',
  },
  justifyCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatarLarge: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  grid: { width: '98%' },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const ProfileScreen = ({ history }) => {
  // initializations
  const classes = useStyles();
  const dispatch = useDispatch();

  // user
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  // orders
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  // hooks
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [nameFromDB, setNameFromDB] = useState('');
  const [emailFromDB, setEmailFromDB] = useState('');
  const [fieldsError, setFieldsError] = useState('');
  const [updatingUserDetails, setUpdatingUserDetails] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      } else {
        setNameFromDB(user.name);
        setEmailFromDB(user.email);
      }
    }

    if (success) {
      console.log('SUCCESSSS');
      setUpdatingUserDetails(false);
      setTimeout(() => {
        history.go(0);
      }, 3000);
    }
  }, [history, dispatch, user, userInfo, success]);

  // handlers
  const onSubmit = ({ name, email, password, confirmPassword }) => {
    if (!name && !email && !password) {
      setFieldsError('Please, fill field(s) to update');
    } else {
      if (password || confirmPassword) {
        setFieldsError('');
        if (password === confirmPassword) {
          setPasswordsMatch(true);
          dispatch(updateUserProfile({ id: user._id, name, email, password }));
          setUpdatingUserDetails(true);
        } else {
          setPasswordsMatch(false);
        }
      } else {
        setFieldsError('');
        dispatch(updateUserProfile({ id: user._id, name, email, password }));
        setUpdatingUserDetails(true);
      }
    }
  };

  const editUserImage = () => {
    console.log('Edit User Image');
  };

  return (
    <div className={classes.root}>
      {!loading && !error && <Meta title={`${nameFromDB} | Wintex`} />}
      <Grid container spacing={3}>
        <Grid item lg={3} md={4} sm={12} className={classes.grid}>
          <UserDetails
            classes={classes}
            loading={loading}
            onSubmit={onSubmit}
            passwordsMatch={passwordsMatch}
            error={error}
            nameFromDB={nameFromDB}
            emailFromDB={emailFromDB}
            editUserImage={editUserImage}
            fieldsError={fieldsError}
            success={success}
            updatingUserDetails={updatingUserDetails}
          />
        </Grid>
        <Grid item lg={9} md={8} sm={12} className={classes.grid}>
          <UserOrders
            classes={classes}
            orders={orders}
            loadingOrders={loadingOrders}
            errorOrders={errorOrders}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileScreen;
