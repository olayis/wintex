import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const LinearLoader = ({ variant, progress }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {variant === 'indeterminate' ? (
        <LinearProgress />
      ) : (
        <LinearProgress variant={variant} value={progress} />
      )}
    </div>
  );
};

export default LinearLoader;
