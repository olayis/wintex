import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import {
  PayPalIcon,
  StripeIcon,
  CreditCardIcon,
  PaymentMethodIcon,
} from '../../../../utils/customIcons';

const useStyles = makeStyles((theme) => ({
  isSelected: {
    backgroundColor: theme.palette.grey[400],
  },
  paymentMethodButton: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
  },
}));

const PaymentMethod = ({
  paymentMethodFromState,
  onPaymentMethodSubmit,
  classes,
  handleNext,
}) => {
  const paymentMethodClasses = useStyles();

  const [paymentMethod, setPaymentMethod] = useState(
    paymentMethodFromState ? paymentMethodFromState : 'PayPal'
  );
  const handleChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  // handlers
  const handleSubmit = () => {
    onPaymentMethodSubmit(paymentMethod);
    handleNext();
  };

  return (
    <Paper className={classes.paper} elevation={0}>
      <Typography variant='h1' className={classes.heading} align='center'>
        Payment
      </Typography>
      <FormControl component='fieldset'>
        <FormLabel component='legend' style={{ marginBottom: '12px' }}>
          Select Payment Method
        </FormLabel>
        <RadioGroup
          aria-label='Payment Method'
          name='paymentMethod'
          value={paymentMethod}
          onChange={handleChange}
        >
          <FormControlLabel
            value='PayPal'
            control={<Radio color='primary' />}
            label='PayPal'
          />
          <FormControlLabel
            value='Stripe'
            control={<Radio color='primary' />}
            label='Stripe'
          />
          <FormControlLabel
            value='Credit Card'
            control={<Radio color='primary' />}
            label='Credit Card'
          />
          <FormControlLabel
            value='Cash On Delivery'
            control={<Radio color='primary' />}
            label='Cash On Delivery'
          />
        </RadioGroup>
      </FormControl>

      <Grid container spacing={3} style={{ margin: '15px 0 5px' }}>
        <Grid item xs>
          <span
            className={`${paymentMethodClasses.paymentMethodButton} ${
              paymentMethod === 'PayPal' ? paymentMethodClasses.isSelected : ''
            }`}
            onClick={() => setPaymentMethod('PayPal')}
          >
            {PayPalIcon}
          </span>
        </Grid>

        <Grid item xs>
          <span
            className={`${paymentMethodClasses.paymentMethodButton} ${
              paymentMethod === 'Stripe' ? paymentMethodClasses.isSelected : ''
            }`}
            onClick={() => setPaymentMethod('Stripe')}
          >
            {StripeIcon}
          </span>
        </Grid>

        <Grid item xs>
          <span
            className={`${paymentMethodClasses.paymentMethodButton} ${
              paymentMethod === 'Credit Card'
                ? paymentMethodClasses.isSelected
                : ''
            }`}
            onClick={() => setPaymentMethod('Credit Card')}
          >
            {CreditCardIcon}
          </span>
        </Grid>

        <Grid item xs>
          <span
            className={`${paymentMethodClasses.paymentMethodButton} ${
              paymentMethod === 'Cash On Delivery'
                ? paymentMethodClasses.isSelected
                : ''
            }`}
            onClick={() => setPaymentMethod('Cash On Delivery')}
          >
            {PaymentMethodIcon}
          </span>
        </Grid>
      </Grid>

      <Button onClick={handleSubmit} variant='contained' color='primary'>
        Continue
      </Button>
    </Paper>
  );
};

export default PaymentMethod;
