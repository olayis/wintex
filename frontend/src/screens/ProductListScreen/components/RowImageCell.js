import { useState } from 'react';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { createTheme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import CircularLoader from '../../../components/Loaders/CircularLoader';

const defaultTheme = createTheme();

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: theme.spacing(1.5),
    },
    editRoot: {
      padding: theme.spacing(0.5),
    },
    img: {
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '5px',
      padding: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
    },
    changeButton: {
      margin: theme.spacing(0.5),
    },
  }),
  { defaultTheme }
);

const RowImageCell = ({ api, id, value }) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const isInEditMode = api.getRowMode(id) === 'edit';

  const handleUploadDialogOpen = () => {
    setUploadDialogOpen(true);
  };

  const handleUploadDialogClose = () => {
    setUploadDialogOpen(false);
  };

  const onSubmit = ({ image }) => {
    if (image) {
      console.log('Image Uploaded: ', image);
    }
  };

  if (isInEditMode) {
    return (
      <>
        <div className={classes.editRoot}>
          <Button
            variant='contained'
            color='primary'
            size='small'
            className={classes.uploadButton}
            startIcon={<PhotoCameraIcon />}
            onClick={handleUploadDialogOpen}
          >
            Change
          </Button>
        </div>
        <div>
          <Dialog
            open={uploadDialogOpen}
            onClose={handleUploadDialogClose}
            aria-labelledby='upload-dialog-title'
            aria-describedby='upload-dialog-description'
          >
            <DialogTitle id='upload-dialog-title'>{`Upload a new image`}</DialogTitle>
            <DialogContent>
              <img className={classes.img} src={value} alt={id} />
              <div className={classes.root}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input type='file' {...register('image')} />
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    className={classes.button}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload
                  </Button>
                </form>
                {uploading && <CircularLoader />}
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleUploadDialogClose}
                color='primary'
                autoFocus
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={classes.root}>
        <img className={classes.img} src={value} alt={id} />
      </div>
    </>
  );
};

RowImageCell.propTypes = {
  api: PropTypes.object.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default RowImageCell;
