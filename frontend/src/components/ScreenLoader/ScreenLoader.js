import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    position: 'fixed',
  },
}));

const ScreenLoader = () => {
  const classes = useStyles();

  const screenLoad = useSelector((state) => state.screenLoad);
  const { loading } = screenLoad;

  return (
    loading && (
      <div className={classes.root}>
        <LinearProgress />
      </div>
    )
  );
};

export default ScreenLoader;
