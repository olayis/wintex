import Icon from '@material-ui/core/Icon';
import googleSVG from '../static/icons/google.svg';
import facebookFilledSVG from '../static/icons/facebookFilled.svg';
import payPalSVG from '../static/icons/paypal.svg';
import paymentMethodSVG from '../static/icons/paymentMethod.svg';
import creditCardSVG from '../static/icons/creditCard.svg';

const iconStyle = { width: '100%', height: 'auto' };

export const FacebookFilledIcon = (
  <Icon>
    <img alt='Facebook' src={facebookFilledSVG} style={iconStyle} />
  </Icon>
);

export const GoogleIcon = (
  <Icon>
    <img alt='Google' src={googleSVG} style={iconStyle} />
  </Icon>
);

export const PayPalIcon = (
  <Icon>
    <img alt='PayPal' src={payPalSVG} style={iconStyle} />
  </Icon>
);

export const PaymentMethodIcon = (
  <Icon>
    <img alt='Pay Cash' src={paymentMethodSVG} style={iconStyle} />
  </Icon>
);

export const CreditCardIcon = (
  <Icon>
    <img alt='Debit/Credit Card' src={creditCardSVG} style={iconStyle} />
  </Icon>
);
