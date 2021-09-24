import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { updateProduct } from '../../../actions/productActions';
import Message from '../../../components/Message/Message';
import uploadFileHelper from '../../../helpers/uploadFileHelper';
import ImageUploadDialog from '../../../components/Upload/ImageUploadDialog';

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
  const [image, setImage] = useState('');
  const [requiredMessage, setRequiredMessage] = useState('');

  const [ImageUploadDialogOpen, setImageUploadDialogOpen] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageMessage, setImageMessage] = useState({ text: '', severity: '' });

  const handleImageUploadDialogOpen = () => {
    setImageUploadDialogOpen(true);
  };

  const handleImageUploadDialogClose = () => {
    setImageUploadDialogOpen(false);
  };

  const uploadFileHandler = async (e) => {
    setImageUploading(true);

    const result = await uploadFileHelper(e);

    if (result.data) {
      setImage(result.data);
    }

    setImageMessage({ text: result.text, severity: result.severity });
    setImageUploading(false);
  };

  const onSubmit = ({
    name,
    price,
    category,
    brand,
    countInStock,
    description,
  }) => {
    if (image) {
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
    } else {
      setRequiredMessage('Please, upload a valid product image');
    }
  };

  return (
    <div>
      {requiredMessage && (
        <Message severity='error' collapsible>
          {requiredMessage}
        </Message>
      )}
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

        <div style={{ margin: '12px', marginBottom: '32px' }}>
          <Button
            type='button'
            variant='contained'
            color='primary'
            className={`${classes.button} ${classes.uploadButton}`}
            startIcon={<PhotoCameraIcon />}
            onClick={handleImageUploadDialogOpen}
          >
            Upload Image
          </Button>
          <ImageUploadDialog
            uploadDialogOpen={ImageUploadDialogOpen}
            handleUploadDialogClose={handleImageUploadDialogClose}
            message={imageMessage}
            uploadFileHandler={uploadFileHandler}
            uploading={imageUploading}
            newImageSrc={image}
            imageAlt='Product'
          />
        </div>

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
    </div>
  );
};

export default NewProductForm;
