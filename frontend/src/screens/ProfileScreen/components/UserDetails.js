import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import EditIcon from '@material-ui/icons/Edit';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Message from '../../../components/Message/Message';
import sampleUserImage from '../../../static/images/sample_user2.jpg';
import CircularLoader from '../../../components/Loaders/CircularLoader';

const UserDetails = ({
  classes,
  loading,
  onSubmit,
  passwordsMatch,
  error,
  success,
  fieldsError,
  nameFromDB,
  emailFromDB,
  editUserImage,
  updatingUserDetails,
}) => {
  // hooks
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // form hooks
  const { handleSubmit, control, setValue } = useForm();

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

  useEffect(() => {
    // defaultValues
    if (!loading) {
      setValue('name', nameFromDB);
      setValue('email', emailFromDB);
    }
  }, [loading, setValue, nameFromDB, emailFromDB]);

  return (
    <Paper className={classes.paper}>
      <Typography variant='h2' className={classes.heading} align='center'>
        User Profile
      </Typography>

      {loading && <CircularLoader variant='indeterminate' />}
      {error && (
        <Message severity='error' collapsible>
          {error}
        </Message>
      )}
      {success && (
        <Message severity='success' collapsible>
          Profile Updated
        </Message>
      )}
      {fieldsError && (
        <Message severity='error' collapsible>
          {fieldsError}
        </Message>
      )}

      <div className={classes.justifyCenter}>
        <div>
          <div className={classes.justifyCenter}>
            <Badge
              overlap='circular'
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              badgeContent={
                <IconButton
                  aria-label='edit user image'
                  onClick={editUserImage}
                  onMouseDown={handleMouseDownPassword}
                  style={{
                    border: '1px solid #1a1a1a',
                    padding: '3px',
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                  }}
                >
                  <EditIcon style={{ fontSize: 18 }} />
                </IconButton>
              }
            >
              <Avatar
                alt={nameFromDB}
                src={sampleUserImage}
                className={classes.avatarLarge}
              />
            </Badge>
          </div>
          <div>
            <Typography
              align='center'
              style={{ marginTop: '8px' }}
              variant='subtitle2'
            >
              {nameFromDB}
            </Typography>
            <Typography align='center' variant='body2'>
              {emailFromDB}
            </Typography>
          </div>
        </div>
      </div>
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
                disabled={loading || updatingUserDetails || !!error}
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
                disabled={loading || updatingUserDetails || !!error}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <EmailIcon
                        color='action'
                        style={{ marginRight: '12px' }}
                      />
                    </InputAdornment>
                  ),
                  autoComplete: 'new-email',
                }}
              />
            )}
            rules={{
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
                disabled={loading || updatingUserDetails || !!error}
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
          />

          <Controller
            name='confirmPassword'
            control={control}
            defaultValue=''
            disabled={loading || updatingUserDetails || !!error}
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
                disabled={loading || updatingUserDetails || !!error}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle confirm password visibility'
                        onClick={toggleShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </div>
        <div className={classes.wrapper}>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={loading || updatingUserDetails || !!error}
          >
            Update Details
          </Button>
          {updatingUserDetails && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </form>
    </Paper>
  );
};

export default UserDetails;
