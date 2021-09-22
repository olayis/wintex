import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { green } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularLoader from '../../components/Loaders/CircularLoader';
import ExportToolbar from '../../components/Toolbar/ExportToolbar';
import Illustration from '../../components/Illustration/Illustration';
import Message from '../../components/Message/Message';
import { listUsers } from '../../actions/userActions';
import { USER_UPDATE_RESET } from '../../constants/userConstants';
import noUsersImage from '../../static/images/users.svg';
import userRows from './data/userRows';
import userColumns from './data/userColumns';
import { validateEmail } from '../../helpers/validators';
import Meta from '../../components/Meta/Meta';
import GoBack from '../../components/Navigation/GoBack';

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

const UserListScreen = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [editRowsModel, setEditRowsModel] = useState({});

  // users
  const userList = useSelector((state) => state.userList);
  const { loading, error, users = [] } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { loading: loadingDelete, success: successDelete } = userDelete;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = userUpdate;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }

    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
    }
  }, [dispatch, history, userInfo, successDelete, successUpdate]);

  // data-grid
  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditRowsModelChange = useCallback((newModel) => {
    const updatedModel = { ...newModel };
    Object.keys(updatedModel).forEach((id) => {
      if (updatedModel[id].email) {
        const isValid = validateEmail(updatedModel[id].email.value);
        updatedModel[id].email = {
          ...updatedModel[id].email,
          error: !isValid,
        };
      }
    });
    setEditRowsModel(updatedModel);
  }, []);

  return (
    <>
      <GoBack history={history} />
      <Paper style={{ padding: '16px', marginTop: '12px' }}>
        <Meta title='Users | Wintex' />
        <Typography
          variant='h1'
          style={{ marginBottom: '16px' }}
          align='center'
        >
          Users
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
        ) : users.length !== 0 ? (
          <>
            <div style={{ marginBottom: '8px' }}>
              <div style={{ marginBottom: '5px' }}>
                {loadingDelete && (
                  <>
                    <CircularLoader />
                    <p style={{ textAlign: 'center' }}>Deleting...</p>
                  </>
                )}
                {successDelete && (
                  <Message severity='success' collapsible>
                    User has been deleted successfully
                  </Message>
                )}
              </div>
              <div style={{ marginBottom: '5px' }}>
                {loadingUpdate && (
                  <>
                    <CircularLoader />
                    <p style={{ textAlign: 'center' }}>Updating...</p>
                  </>
                )}
                {successUpdate && (
                  <Message severity='success' collapsible>
                    User has been updated successfully
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
                  rows={userRows(users)}
                  columns={userColumns}
                  pageSize={20}
                  rowsPerPageOptions={[20]}
                  editMode='row'
                  onRowEditStart={handleRowEditStart}
                  onRowEditStop={handleRowEditStop}
                  editRowsModel={editRowsModel}
                  onEditRowsModelChange={handleEditRowsModelChange}
                  components={{
                    Toolbar: ExportToolbar,
                  }}
                />
              </ThemeProvider>
            </div>
          </>
        ) : (
          <Illustration
            actionLink='#'
            actionText=''
            altText='No Users'
            heading={'No users to display'}
            image={noUsersImage}
            imgHeight={273}
            imgWidth={300}
          />
        )}
      </Paper>
    </>
  );
};

export default UserListScreen;
