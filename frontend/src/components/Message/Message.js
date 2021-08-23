import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Message = ({ severity, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity={severity}>{children}</Alert>
    </div>
  );
};

Message.defaultProps = {
  severity: 'info',
};

export default Message;
