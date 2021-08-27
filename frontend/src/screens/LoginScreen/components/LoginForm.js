import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const LoginForm = ({ onSubmit, classes, loading }) => {
  // form hooks
  const { handleSubmit, control } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  // togglers
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Controller
          name='email'
          control={control}
          defaultValue=''
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              className={classes.textField}
              label='Email Address'
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              type='email'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <EmailIcon color='action' style={{ marginRight: '12px' }} />
                  </InputAdornment>
                ),
              }}
            />
          )}
          rules={{ required: 'Email Address required' }}
        />
        <Controller
          name='password'
          control={control}
          defaultValue=''
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              className={classes.textField}
              label='Password'
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle confirm password visibility'
                      onClick={toggleShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
          rules={{ required: 'Password required' }}
        />
      </div>
      <div className={classes.forgotPassword}>
        <Typography variant='subtitle2' align='right'>
          <Link component={RouterLink} to='/login'>
            Forgot your password?
          </Link>
        </Typography>
      </div>
      <Button
        type='submit'
        variant='contained'
        color='primary'
        disabled={loading}
      >
        SIGN IN
      </Button>
    </form>
  );
};

export default LoginForm;
