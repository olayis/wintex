import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 290,
    padding: theme.spacing(2),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1.2),
      maxWidth: '100%',
    },
  },
  media: {
    height: 223,
    borderRadius: '3px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: 180,
    },
  },
  rating: {
    display: 'flex',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  productTitle: {
    fontWeight: '400',
    fontSize: '1.2em',
  },
}));

const Product = ({ product }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Link
        component={RouterLink}
        to={`/product/${product._id}`}
        underline='none'
      >
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={product.image}
            title={product.name}
          />

          <CardContent>
            <Typography
              gutterBottom
              variant='h6'
              component='h2'
              className={classes.productTitle}
              noWrap
            >
              {product.name}
            </Typography>
            <Typography variant='h6' color='textSecondary' component='p'>
              ₦{product.price}
            </Typography>
            <div className={classes.rating}>
              <Rating name='product-rating' value={product.rating} readOnly />
              <Typography
                variant='body2'
                color='textSecondary'
                style={{ margin: '3px 0 0 8px' }}
              >
                ({product.numReviews})
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default Product;
