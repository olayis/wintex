import { createTheme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularLoader from '../../components/Loaders/CircularLoader';
import Message from '../../components/Message/Message';
import { Typography } from '@material-ui/core';

const defaultTheme = createTheme();

const useStyles = makeStyles(
  (theme) => ({
    img: {
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '5px',
      padding: theme.spacing(1),
    },
  }),
  { defaultTheme }
);

const ImageUploadDialog = ({
  uploadDialogOpen,
  handleUploadDialogClose,
  message,
  uploadFileHandler,
  uploading,
  imageSrc,
  imageAlt,
  newImageSrc,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={uploadDialogOpen}
      onClose={handleUploadDialogClose}
      aria-labelledby='upload-dialog-title'
      aria-describedby='upload-dialog-description'
    >
      <DialogTitle id='upload-dialog-title'>{`Upload a new image`}</DialogTitle>
      <DialogContent>
        {message.text && (
          <Message severity={message.severity} collapsible>
            {message.text}
          </Message>
        )}
        {imageSrc && (
          <>
            <Typography variant='body1' align='center'>
              Current Image
            </Typography>
            <img className={classes.img} src={imageSrc} alt={imageAlt} />
          </>
        )}
        {newImageSrc && (
          <>
            <Typography variant='body1' align='center'>
              Uploaded Image
            </Typography>
            <img
              className={classes.img}
              src={newImageSrc}
              alt={`newly uploaded for ${imageAlt}`}
            />
          </>
        )}
        <div className={classes.uploadSection}>
          {uploading && <CircularLoader />}
          <input type='file' onChange={uploadFileHandler} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleUploadDialogClose} color='primary' autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageUploadDialog;
