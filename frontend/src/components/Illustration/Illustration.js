import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

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

const Illustration = ({
  image,
  altText,
  imgWidth,
  imgHeight,
  heading,
  actionText,
  actionLink,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <img
          src={image}
          alt={altText}
          width={imgWidth}
          height={imgHeight}
          className={classes.image}
        />
        <Typography
          variant={'h2'}
          color='textSecondary'
          className={classes.title}
        >
          {heading}
        </Typography>
        <Link component={RouterLink} to={actionLink} className={classes.link}>
          {actionText}
        </Link>
      </div>
    </div>
  );
};

export default Illustration;
