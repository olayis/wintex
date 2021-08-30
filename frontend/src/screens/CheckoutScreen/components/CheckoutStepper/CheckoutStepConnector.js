import { withStyles } from '@material-ui/core/styles';
import StepConnector from '@material-ui/core/StepConnector';

const CheckoutStepConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,#1A1A1A 0%,#414141 50%,#6C6C6C 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,#1A1A1A 0%,#414141 50%,#6C6C6C 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

export default CheckoutStepConnector;
