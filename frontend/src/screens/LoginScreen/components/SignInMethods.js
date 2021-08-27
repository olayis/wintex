import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FacebookFilledIcon, GoogleIcon } from '../../../utils/customIcons';

const SignInMethods = ({ loading }) => {
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
          SIGN IN WITH GOOGLE
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
          SIGN IN WITH FACEBOOK
        </Typography>
      </Button>
    </>
  );
};

export default SignInMethods;
