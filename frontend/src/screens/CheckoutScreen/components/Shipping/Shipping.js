import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FlagIcon from '@material-ui/icons/Flag';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';

const Shipping = ({
  onShippingSubmit,
  classes,
  shippingAddress,
  handleNext,
}) => {
  // form hooks
  const { handleSubmit, control, setValue } = useForm();

  useEffect(() => {
    // defaultValues
    if (shippingAddress.address) {
      setValue('address', shippingAddress.address);
      setValue('city', shippingAddress.city);
      setValue('postalCode', shippingAddress.postalCode);
      setValue('country', shippingAddress.country);
    }
  }, [setValue, shippingAddress]);

  // handlers
  const handleSubmitShippingForm = (data) => {
    onShippingSubmit(data);
    handleNext();
  };

  return (
    <Paper className={classes.paper} elevation={0}>
      <Typography variant='h1' className={classes.heading} align='center'>
        Shipping
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitShippingForm)}>
        <div>
          <Controller
            name='address'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                className={classes.textField}
                label='Address'
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                type='text'
                multiline
                maxRows={4}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <LocationOnIcon color='action' />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            rules={{ required: 'Address required' }}
          />

          <Controller
            name='city'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                className={classes.textField}
                label='City'
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                type='text'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <LocationCityIcon color='action' />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            rules={{
              required: 'City required',
            }}
          />

          <Controller
            name='postalCode'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                className={classes.textField}
                label='Postal Code'
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                type='text'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <MarkunreadMailboxIcon color='action' />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            rules={{
              required: 'Postal code required',
            }}
          />

          <Controller
            name='country'
            control={control}
            defaultValue=''
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                className={classes.textField}
                label='Country'
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
                type='text'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <FlagIcon color='action' />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            rules={{
              required: 'Country required',
            }}
          />
        </div>
        <Button type='submit' variant='contained' color='primary'>
          Continue
        </Button>
      </form>
    </Paper>
  );
};

export default Shipping;
