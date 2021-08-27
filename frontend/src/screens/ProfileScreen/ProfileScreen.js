import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { getUserDetails, updateUserProfile } from '../../actions/userActions';
import UserDetails from './components/UserDetails';
import UserOrders from './components/UserOrders';

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

  // hooks
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [nameFromDB, setNameFromDB] = useState('');
  const [emailFromDB, setEmailFromDB] = useState('');
  const [fieldsError, setFieldsError] = useState('');

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails('profile'));
      } else {
        setNameFromDB(user.name);
        setEmailFromDB(user.email);
      }
    }
  }, [history, dispatch, user, userInfo]);

  console.log('nameFromDB: ', nameFromDB);
  console.log('emailFromDB: ', emailFromDB);

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
        } else {
          setPasswordsMatch(false);
        }
      } else {
        setFieldsError('');
        dispatch(updateUserProfile({ id: user._id, name, email, password }));
      }
    }
  };

  const editUserImage = () => {
    console.log('Edit User Image');
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item lg={3} md={4} sm={12}>
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
          />
        </Grid>
        <Grid item lg={9} md={8} sm={12}>
          <UserOrders classes={classes} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfileScreen;
