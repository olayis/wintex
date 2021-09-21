import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Message = ({ severity, children, collapsible }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  return (
    <div className={classes.root}>
      {collapsible ? (
        <Collapse in={open}>
          <Alert
            severity={severity}
            action={
              <IconButton
                aria-label='close'
                color='inherit'
                size='small'
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize='inherit' />
              </IconButton>
            }
          >
            {children}
          </Alert>
        </Collapse>
      ) : (
        <Alert severity={severity}>{children}</Alert>
      )}
    </div>
  );
};

Message.defaultProps = {
  severity: 'info',
  text: '',
  collapsible: false,
};

export default Message;
