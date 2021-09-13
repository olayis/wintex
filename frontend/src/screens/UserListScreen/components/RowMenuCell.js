import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { green, red } from '@material-ui/core/colors';
import { createTheme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { deleteUser, updateUser } from '../../../actions/userActions';
import { USER_UPDATE_FAIL } from '../../../constants/userConstants';

const defaultTheme = createTheme();

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: theme.spacing(1),
      color: theme.palette.text.secondary,
    },
    textPrimary: {
      color: theme.palette.text.primary,
    },
  }),
  { defaultTheme }
);

const RowMenuCell = (props) => {
  const { api, id } = props;
  const classes = useStyles();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const dispatch = useDispatch();

  const isInEditMode = api.getRowMode(id) === 'edit';

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleEditClick = (event) => {
    event.stopPropagation();
    api.setRowMode(id, 'edit');
  };

  const handleSaveClick = (event) => {
    event.stopPropagation();
    api.commitRowChange(id);
    api.setRowMode(id, 'view');

    const row = api.getRow(id);

    console.log('isAdmin: ', row.isAdmin);

    // validate isAdmin values
    if (
      row.isAdmin === 'true' ||
      row.isAdmin === 'false' ||
      row.isAdmin === true ||
      row.isAdmin === false
    ) {
      dispatch(
        updateUser({
          _id: row.id,
          name: row.name,
          email: row.email,
          isAdmin: row.isAdmin,
        })
      );
    } else {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload: "'isAdmin' values can only be true or false.",
      });
    }

    api.updateRows([row]);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    dispatch(deleteUser(id));
    api.updateRows([{ id, _action: 'delete' }]);
  };

  const handleCancelClick = (event) => {
    event.stopPropagation();
    api.setRowMode(id, 'view');
  };

  if (isInEditMode) {
    return (
      <div className={classes.root}>
        <IconButton
          color='primary'
          size='small'
          aria-label='save'
          onClick={handleSaveClick}
        >
          <SaveIcon fontSize='small' style={{ color: green[500] }} />
        </IconButton>
        <IconButton
          color='inherit'
          size='small'
          aria-label='cancel'
          className={classes.textPrimary}
          onClick={handleCancelClick}
        >
          <CloseIcon fontSize='small' />
        </IconButton>
      </div>
    );
  }

  return (
    <>
      <div className={classes.root}>
        <IconButton
          color='inherit'
          className={classes.textPrimary}
          size='small'
          aria-label='edit'
          onClick={handleEditClick}
        >
          <EditIcon fontSize='small' />
        </IconButton>
        <IconButton
          color='inherit'
          size='small'
          aria-label='delete'
          onClick={handleDeleteDialogOpen}
        >
          <DeleteIcon fontSize='small' />
        </IconButton>
      </div>
      <div>
        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteDialogClose}
          aria-labelledby='delete-dialog-title'
          aria-describedby='delete-dialog-description'
        >
          <DialogTitle id='delete-dialog-title'>{`Delete User ${id}`}</DialogTitle>
          <DialogContent>
            <DialogContentText id='delete-dialog-description'>
              Note, this action is not reversible. Do you want to proceed?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose} color='primary' autoFocus>
              Cancel
            </Button>
            <Button onClick={handleDeleteClick} style={{ color: red[500] }}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

RowMenuCell.propTypes = {
  api: PropTypes.object.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default RowMenuCell;
