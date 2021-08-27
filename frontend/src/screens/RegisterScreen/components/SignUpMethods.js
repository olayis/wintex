import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FacebookFilledIcon, GoogleIcon } from '../../../utils/customIcons';

const SignUpMethods = ({ loading }) => {
  return (
    <>
      <Typography
        variant='button'
        align='center'
        style={{ display: 'block', marginTop: '16px' }}
      >
        OR
      </Typography>
      <Button
        variant='outlined'
        color='primary'
        disabled={loading}
        startIcon={GoogleIcon}
      >
        <Typography variant='button' noWrap>
          SIGN UP WITH GOOGLE
        </Typography>
      </Button>
      <Button
        variant='outlined'
        color='primary'
        disabled={loading}
        startIcon={FacebookFilledIcon}
        style={{ marginTop: '0' }}
      >
        <Typography variant='button' noWrap>
          SIGN UP WITH FACEBOOK
        </Typography>
      </Button>
    </>
  );
};

export default SignUpMethods;
