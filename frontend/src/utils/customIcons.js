import Icon from '@material-ui/core/Icon';
import googleSVG from '../static/icons/google.svg';
import facebookFilledSVG from '../static/icons/facebookFilled.svg';

export const FacebookFilledIcon = (
  <Icon>
    <img
      alt='Facebook'
      src={facebookFilledSVG}
      style={{ width: '100%', height: 'auto' }}
    />
  </Icon>
);

export const GoogleIcon = (
  <Icon>
    <img
      alt='Google'
      src={googleSVG}
      style={{ width: '100%', height: 'auto' }}
    />
  </Icon>
);
