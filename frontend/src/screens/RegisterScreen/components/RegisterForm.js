import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import EmailIcon from '@material-ui/icons/Email';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const RegisterForm = ({ onSubmit, classes, loading, passwordsMatch }) => {
  // hooks
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // form hooks
  const { handleSubmit, control } = useForm();

  // togglers
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Controller
          name='name'
          control={control}
          defaultValue=''
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              className={classes.textField}
              label='Fullname'
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              type='text'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <AccountCircleIcon
                      color='action'
                      style={{ marginRight: '12px' }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          )}
          rules={{
            required: 'Name required',
            maxLength: {
              value: '100',
              message: 'Fullname should not exceed 100 characters',
            },
          }}
        />
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
                autoComplete: 'new-email',
              }}
            />
          )}
          rules={{
            required: 'Email Address required',
            maxLength: {
              value: '320',
              message: 'Email Address should not exceed 320 characters',
            },
          }}
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
              error={
                passwordsMatch
                  ? !!error
                  : passwordsMatch === false
                  ? true
                  : false
              }
              helperText={
                !passwordsMatch
                  ? 'Passwords do not match, please confirm.'
                  : error
                  ? error.message
                  : null
              }
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={toggleShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
                autoComplete: 'new-password',
              }}
            />
          )}
          rules={{ required: 'Password required' }}
        />

        <Controller
          name='confirmPassword'
          control={control}
          defaultValue=''
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              className={classes.textField}
              label='Confirm Password'
              value={value}
              onChange={onChange}
              error={
                passwordsMatch
                  ? !!error
                  : passwordsMatch === false
                  ? true
                  : false
              }
              helperText={
                !passwordsMatch
                  ? 'Passwords do not match, please confirm.'
                  : error
                  ? error.message
                  : null
              }
              type={showConfirmPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle confirm password visibility'
                      onClick={toggleShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
          rules={{ required: 'Confirm Password required' }}
        />
      </div>
      <Button
        type='submit'
        variant='contained'
        color='primary'
        disabled={loading}
      >
        SIGN UP
      </Button>
    </form>
  );
};

export default RegisterForm;
