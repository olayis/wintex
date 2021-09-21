import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularLoader from '../../../components/Loaders/CircularLoader';
import Message from '../../../components/Message/Message';
import NewProductForm from './NewProductForm';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(2),
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
  textField: {
    display: 'block',
    width: '100%',
    marginBottom: theme.spacing(3),
  },
}));

const NewProductDialog = ({
  open,
  handleAddDialogClose,
  handleAddDialogCloseOnCancel,
}) => {
  const classes = useStyles();
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete } = productDelete;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = productUpdate;

  return (
    <Dialog
      open={open}
      onClose={handleAddDialogCloseOnCancel}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title' style={{ textAlign: 'center' }}>
        Add Product
      </DialogTitle>
      <DialogContent>
        <div style={{ marginBottom: '5px' }}>
          {loadingDelete && (
            <>
              <CircularLoader variant='indeterminate' />
              <p style={{ textAlign: 'center' }}>Deleting...</p>
            </>
          )}
        </div>
        <div style={{ marginBottom: '5px' }}>
          {loadingCreate && (
            <>
              <CircularLoader variant='indeterminate' />
              <p style={{ textAlign: 'center' }}>
                Initializing a new product...
              </p>
            </>
          )}
          {errorCreate && (
            <Message severity='error' collapsible>
              <strong>Unable to initialize a new product: </strong>
              {errorCreate}
            </Message>
          )}
          <div style={{ marginBottom: '5px' }}>
            {loadingUpdate && (
              <>
                <CircularLoader variant='indeterminate' />
                <p style={{ textAlign: 'center' }}>Creating product...</p>
              </>
            )}
            {successUpdate && (
              <Message severity='success' collapsible>
                Product has been created successfully
              </Message>
            )}
            {errorUpdate && (
              <Message severity='error' collapsible>
                <strong>Unable to create product: </strong>
                {errorUpdate}
              </Message>
            )}
          </div>
        </div>
        <div className={classes.root}>
          <NewProductForm
            classes={classes}
            createdProduct={createdProduct}
            handleAddDialogClose={handleAddDialogClose}
            handleAddDialogCloseOnCancel={handleAddDialogCloseOnCancel}
            loadingCreate={loadingCreate}
            loadingDelete={loadingDelete}
            loadingUpdate={loadingUpdate}
            errorCreate={errorCreate}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewProductDialog;
