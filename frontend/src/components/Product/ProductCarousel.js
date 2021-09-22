import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Skeleton from '@material-ui/lab/Skeleton';
import { listTopProducts } from '../../actions/productActions';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    padding: theme.spacing(4),
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    position: 'relative',
    top: '300px',
    zIndex: '10',
  },
  imgContainer: {
    height: 300,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: '5px',
  },
  img: {
    height: '100%',
    display: 'block',
    maxWidth: '100%',
    overflow: 'hidden',
    width: 'auto',
    padding: '20px',
    borderRadius: '50%',
  },
  navButton: {
    visibility: 'hidden',
    transition: 'visibility linear 2s',
    marginTop: '-350px',
    borderRadius: '50%',
  },
  carousel: {
    marginTop: '-50px',
    '&:hover $navButton': {
      visibility: 'visible',
    },
  },
  productName: {
    textTransform: 'uppercase',
    fontSize: '1.6rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      fontWeight: '500',
    },
  },
  productPrice: {
    marginLeft: '8px',
    fontSize: '1.2rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
}));

const ProductCarousel = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products = [] } = productTopRated;

  const [activeStep, setActiveStep] = useState(0);
  const [play, setPlay] = useState(true);
  const maxSteps = products.length;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    play && setActiveStep(step);
  };

  return (
    <div>
      {loading ? (
        <>
          <Skeleton
            animation='wave'
            width='20%'
            height='30px'
            style={{ margin: '0 auto' }}
          />
          <Skeleton
            animation='wave'
            width='100%'
            height='420px'
            style={{ marginTop: '-80px' }}
          />
        </>
      ) : error ? (
        <>
          <Typography variant='h2' align='center'>
            Top Rated
          </Typography>

          <div
            style={{
              height: '320px',
              backgroundColor: '#1a1a1a',
              margin: '12px 0',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '5px',
            }}
          >
            <Typography
              variant='h3'
              style={{
                color: 'white',
                margin: '0 auto',
                padding: '12px',
                textAlign: 'center',
              }}
            >
              Oops! {error}, try refreshing your page.
            </Typography>
          </div>
        </>
      ) : (
        <div className={classes.root}>
          <Typography variant='h2' align='center'>
            Top Rated
          </Typography>

          <div className={classes.carousel}>
            <Link
              component={RouterLink}
              to={`product/${products[activeStep] && products[activeStep]._id}`}
              underline='none'
            >
              <Paper square elevation={0} className={classes.header}>
                <Typography noWrap className={classes.productName}>
                  {products[activeStep] && products[activeStep].name}
                </Typography>
                <Typography className={classes.productPrice}>
                  (₦{products[activeStep] && products[activeStep].price})
                </Typography>
              </Paper>
            </Link>

            <AutoPlaySwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={activeStep}
              enableMouseEvents
              onMouseEnter={() => setPlay(false)}
              onMouseLeave={() => setPlay(true)}
              onChangeIndex={handleStepChange}
            >
              {products.map((product, index) => (
                <div key={product._id}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <Link
                      component={RouterLink}
                      to={`product/${product._id}`}
                      underline='none'
                    >
                      <div className={classes.imgContainer}>
                        <img
                          className={classes.img}
                          src={product.image}
                          alt={product.name}
                        />
                      </div>
                    </Link>
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>

            <MobileStepper
              style={{ margin: '12px 0 20px' }}
              steps={maxSteps}
              position='static'
              variant='dots'
              activeStep={activeStep}
              nextButton={
                <Button
                  size='small'
                  variant='contained'
                  color='secondary'
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                  className={classes.navButton}
                >
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size='small'
                  variant='contained'
                  color='secondary'
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  className={classes.navButton}
                >
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                </Button>
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
