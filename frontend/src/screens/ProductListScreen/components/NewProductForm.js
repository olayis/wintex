import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { updateProduct } from '../../../actions/productActions';

const NewProductForm = ({
  classes,
  createdProduct,
  handleAddDialogClose,
  handleAddDialogCloseOnCancel,
  loadingCreate,
  loadingDelete,
  loadingUpdate,
  errorCreate,
}) => {
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm();

  const onSubmit = ({
    name,
    price,
    category,
    brand,
    countInStock,
    description,
    image,
  }) => {
    dispatch(
      updateProduct({
        _id: createdProduct._id,
        name,
        price,
        category,
        brand,
        countInStock,
        description,
        image,
      })
    );
    handleAddDialogClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='name'
        control={control}
        defaultValue=''
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            className={classes.textField}
            label='Name'
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type='text'
            fullWidth
          />
        )}
        rules={{
          required: 'Name required',
        }}
      />

      <Controller
        name='price'
        control={control}
        defaultValue=''
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            className={classes.textField}
            label='Price'
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type='number'
            fullWidth
          />
        )}
        rules={{
          required: 'Price required',
        }}
      />

      <Controller
        name='category'
        control={control}
        defaultValue=''
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            className={classes.textField}
            label='Category'
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type='text'
            fullWidth
          />
        )}
        rules={{
          required: 'Category required',
        }}
      />

      <Controller
        name='brand'
        control={control}
        defaultValue=''
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            className={classes.textField}
            label='Brand'
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type='text'
            fullWidth
          />
        )}
        rules={{
          required: 'Brand required',
        }}
      />

      <Controller
        name='countInStock'
        control={control}
        defaultValue=''
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            className={classes.textField}
            label='Stock Count'
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type='number'
            fullWidth
          />
        )}
        rules={{
          required: 'Stock Count required',
        }}
      />

      <Controller
        name='description'
        control={control}
        defaultValue=''
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            className={classes.textField}
            label='Description'
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type='text'
            multiline
            fullWidth
          />
        )}
        rules={{
          required: 'Descripton required',
        }}
      />

      <Controller
        name='image'
        control={control}
        defaultValue=''
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            className={classes.textField}
            label='Image URL'
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            type='text'
            fullWidth
          />
        )}
        rules={{
          required: 'Image URL required',
        }}
      />

      <Button
        type='button'
        onClick={handleAddDialogCloseOnCancel}
        disabled={loadingCreate || loadingUpdate || loadingDelete}
        color='primary'
        variant='outlined'
        style={{ marginRight: '12px' }}
      >
        Cancel
      </Button>
      <Button
        type='submit'
        color='primary'
        variant='contained'
        disabled={
          loadingCreate || loadingUpdate || loadingDelete || errorCreate
        }
      >
        Submit
      </Button>
    </form>
  );
};

export default NewProductForm;
