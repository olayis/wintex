import React from 'react';
import numeral from 'numeral';
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
    backgroundColor: '#FAFAFA',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1.2),
      maxWidth: '100%',
    },
  },
  media: {
    height: 223,
    borderRadius: '3px',
    backgroundColor: '#fff',
  },
  mediaImage: {
    height: 223,
    maxWidth: '100%',
    display: 'block',
    margin: '0 auto',
  },
  rating: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  productTitle: {
    fontWeight: '400',
    fontSize: '1.2em',
  },
}));

const Product = ({ product }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={0}>
      <Link
        component={RouterLink}
        to={`/product/${product._id}`}
        underline='none'
      >
        <CardActionArea>
          <CardMedia className={classes.media} title={product.name}>
            <img
              src={product.image}
              alt={product.name}
              className={classes.mediaImage}
            />
          </CardMedia>

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
              {numeral(product.price).format('$0,0.00')}
            </Typography>
            <div className={classes.rating}>
              {product.numReviews ? (
                <>
                  <Rating
                    name='product-rating'
                    value={product.rating}
                    size='small'
                    readOnly
                  />
                  <Typography variant='body2' color='textSecondary'>
                    ({product.numReviews})
                  </Typography>
                </>
              ) : (
                <span style={{ height: '20px' }}></span>
              )}
            </div>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default Product;
