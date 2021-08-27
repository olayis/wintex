import React from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2.5),
    backgroundColor: theme.palette.grey[300],
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography variant='overline' align='center' display='block'>
        Copyright &copy; Wintex. Built by &mdash;{' '}
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
