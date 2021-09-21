import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 290,
    padding: theme.spacing(2),
    marginTop: theme.spacing(3),
    backgroundColor: '#fafafa',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1.2),
      maxWidth: '100%',
    },
  },
  media: {
    height: 223,
    borderRadius: '3px',
  },
  rating: {
    display: 'block',
  },
}));

const ProductSkeleton = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root} elevation={0}>
      <Skeleton animation='wave' variant='rect' className={classes.media} />
      <Skeleton animation='wave' width='60%' height='30px' />
      <Skeleton animation='wave' width='30%' height='30px' />
      <Skeleton
        animation='wave'
        width='80%'
        height='30px'
        className={classes.rating}
      />
    </Card>
  );
};

export default ProductSkeleton;
