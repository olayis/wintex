import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 290,
    padding: theme.spacing(2),
    marginTop: theme.spacing(3),
    '&:hover > card__action': {
      display: 'block',
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%',
    },
  },
  media: {
    height: 223,
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%',
      height: 300,
    },
  },
}));

const ProductSkeleton = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Skeleton animation='wave' variant='rect' className={classes.media} />
      <Skeleton animation='wave' width='60%' height='30px' />
      <Skeleton animation='wave' width='30%' height='30px' />
      <Skeleton animation='wave' width='80%' height='30px' />
    </Card>
  );
};

export default ProductSkeleton;
