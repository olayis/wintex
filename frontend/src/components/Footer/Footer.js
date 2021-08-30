import React from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(3),
    backgroundColor: theme.palette.grey[300],
  },
  footerText: {
    lineHeight: '1.8',
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography
        variant='overline'
        align='center'
        display='block'
        className={classes.footerText}
      >
        Copyright &copy; Wintex. Designed &amp; Developed by &mdash;{' '}
        <Link
          href='https://olusegundev.web.app/'
          target='_blank'
          rel='noreferrer'
        >
          Olusegun (Olayis)
        </Link>
      </Typography>
    </footer>
  );
};

export default Footer;
