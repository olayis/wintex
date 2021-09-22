import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import NewProductDialog from './NewProductDialog';
import { createProduct, deleteProduct } from '../../../actions/productActions';

const AddToolbar = () => {
  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { product: createdProduct } = productCreate;

  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const handleAddDialogOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  const handleAddDialogCloseOnCancel = () => {
    if (createdProduct) {
      dispatch(deleteProduct(createdProduct._id));
    }
    setAddDialogOpen(false);
  };

  const addNewProduct = () => {
    dispatch(createProduct());
    handleAddDialogOpen();
  };

  return (
    <>
      <GridToolbarContainer
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Button
          startIcon={<AddIcon />}
          variant='contained'
          onClick={addNewProduct}
        >
          Add product
        </Button>
        <GridToolbarExport />
      </GridToolbarContainer>
      <NewProductDialog
        open={addDialogOpen}
        addNewProduct={addNewProduct}
        handleAddDialogClose={handleAddDialogClose}
        handleAddDialogCloseOnCancel={handleAddDialogCloseOnCancel}
      />
    </>
  );
};

export default AddToolbar;
