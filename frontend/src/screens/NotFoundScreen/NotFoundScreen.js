import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import offRoadImage from '../../static/images/off_road.svg';
import Meta from '../../components/Meta/Meta';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
  },
  title: {
    marginTop: theme.spacing(2),
    display: 'block',
    textAlign: 'center',
  },
  link: {
    marginTop: theme.spacing(1),
    display: 'block',
    textAlign: 'center',
    fontWeight: '500',
    color: theme.palette.info.main,
  },
}));

const NotFoundScreen = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <Meta title='Page Not Found | Wintex' />
        <Typography
          variant={'h1'}
          color='textSecondary'
          className={classes.title}
        >
          Page Not Found
        </Typography>
        <img
          src={offRoadImage}
          alt='No Orders'
          width='300'
          height='240'
          className={classes.image}
        />
        <Typography
          variant={'h2'}
          color='textSecondary'
          className={classes.title}
        >
          Ooops! The page you are looking for does not exist
        </Typography>
        <Link component={RouterLink} to='/' className={classes.link}>
          Let's go back home.
        </Link>
      </div>
    </div>
  );
};

export default NotFoundScreen;
