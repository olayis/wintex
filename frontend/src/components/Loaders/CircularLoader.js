import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    alignContent: 'center',
    justifyContent: 'center',
  },
}));

const CircularLoader = ({ variant, thickness, size }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {variant === 'indeterminate' ? (
        <CircularProgress
          variant='indeterminate'
          thickness={thickness}
          size={size}
        />
      ) : (
        <CircularProgress variant={variant} thickness={thickness} size={size} />
      )}
    </div>
  );
};

CircularLoader.defaultProps = {
  variant: 'indeterminate',
  thickness: 3.6,
  size: 40,
};

export default CircularLoader;
