import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const HeaderMenu = ({ anchorEl, menuId, isMenuOpen, handleMenuClose }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <Link component={RouterLink} to='/profile' underline='none'>
          Profile
        </Link>
      </MenuItem>
      <MenuItem>
        <Link component={RouterLink} to='/account' underline='none'>
          My Account
        </Link>
      </MenuItem>
      <MenuItem>
        <Link component={RouterLink} to='/login' underline='none'>
          Sign In
        </Link>
      </MenuItem>
    </Menu>
  );
};

export default HeaderMenu;
