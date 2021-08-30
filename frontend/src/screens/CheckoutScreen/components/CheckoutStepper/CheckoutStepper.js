import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import CheckoutStepConnector from './CheckoutStepConnector';
import CheckoutStepIcon from './CheckoutStepIcon';
import ConfirmOrder from '../ConfirmOrder/ConfirmOrder';
import Shipping from '../Shipping/Shipping';
import PaymentMethod from '../Payment/PaymentMethod';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const CheckoutStepper = ({
  checkoutScreenClasses,
  cart,
  onShippingSubmit,
  onPaymentMethodSubmit,
  onConfirmOrder,
}) => {
  const { shippingAddress, paymentMethod: paymentMethodFromState } = cart;

  const getSteps = () => {
    return ['Shipping', 'Payment', 'Confirm Order'];
  };

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  useEffect(() => {
    if (localStorage.getItem('checkoutStep')) {
      setActiveStep(JSON.parse(localStorage.getItem('checkoutStep')));
    }
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    localStorage.setItem('checkoutStep', JSON.stringify(activeStep + 1));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    localStorage.setItem('checkoutStep', JSON.stringify(activeStep - 1));
  };

  const handleReset = () => {
    setActiveStep(0);
    localStorage.setItem('checkoutStep', JSON.stringify(0));
  };

  const goToShippingStep = () => {
    setActiveStep(0);
    localStorage.setItem('checkoutStep', JSON.stringify(0));
  };

  const goToPaymentMethodStep = () => {
    setActiveStep(1);
    localStorage.setItem('checkoutStep', JSON.stringify(1));
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Shipping
            classes={checkoutScreenClasses}
            shippingAddress={shippingAddress}
            onShippingSubmit={onShippingSubmit}
            handleNext={handleNext}
          />
        );
      case 1:
        return (
          <PaymentMethod
            classes={checkoutScreenClasses}
            paymentMethodFromState={paymentMethodFromState}
            onPaymentMethodSubmit={onPaymentMethodSubmit}
            handleNext={handleNext}
          />
        );
      case 2:
        return (
          <ConfirmOrder
            classes={checkoutScreenClasses}
            cart={cart}
            handleNext={handleNext}
            goToShippingStep={goToShippingStep}
            goToPaymentMethodStep={goToPaymentMethodStep}
            onConfirmOrder={onConfirmOrder}
          />
        );
      default:
        return (
          <Shipping
            classes={checkoutScreenClasses}
            shippingAddress={shippingAddress}
            onShippingSubmit={onShippingSubmit}
            handleNext={handleNext}
          />
        );
    }
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<CheckoutStepConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={CheckoutStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              Your order has been received and is being processed.
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <div>{getStepContent(activeStep)}</div>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
                style={{ marginTop: '-8px' }}
              >
                Back
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutStepper;
