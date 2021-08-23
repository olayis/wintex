import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const ProductImage = ({ loading, image, alt, classes }) => {
  return (
    <>
      {loading ? (
        <Skeleton animation='wave' variant='rect' height='500px' />
      ) : (
        <img src={image} alt={alt} className={classes} />
      )}
    </>
  );
};

export default ProductImage;
