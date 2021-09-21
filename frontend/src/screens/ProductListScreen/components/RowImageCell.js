import { useState } from 'react';
import PropTypes from 'prop-types';
import { createTheme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import uploadFileHelper from '../../../helpers/uploadFileHelper';
import ImageUploadDialog from '../../../components/Upload/ImageUploadDialog';

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

  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newImage, setNewImage] = useState('');
  const [message, setMessage] = useState({ text: '', severity: '' });

  const isInEditMode = api.getRowMode(id) === 'edit';

  const handleUploadDialogOpen = () => {
    setUploadDialogOpen(true);
  };

  const handleUploadDialogClose = () => {
    setUploadDialogOpen(false);
  };

  const uploadFileHandler = async (e) => {
    setUploading(true);

    const result = await uploadFileHelper(e);

    if (result.data) {
      const row = api.getRow(id);
      row.image = result.data;
      setNewImage(result.data);
    }

    setMessage({ text: result.text, severity: result.severity });
    setUploading(false);
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
          <ImageUploadDialog
            uploadDialogOpen={uploadDialogOpen}
            handleUploadDialogClose={handleUploadDialogClose}
            message={message}
            uploadFileHandler={uploadFileHandler}
            uploading={uploading}
            imageSrc={value}
            imageAlt={id}
            newImageSrc={newImage}
          />
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
