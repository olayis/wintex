import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Button, Typography } from '@material-ui/core';

const HeaderMenu = ({
  anchorEl,
  menuId,
  isMenuOpen,
  handleMenuClose,
  userInfo,
  logoutHandler,
  menuItemLogoutClass,
}) => {
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
      {userInfo ? (
        [
          <MenuItem key='menu-item-profile'>
            <Link component={RouterLink} to='/profile'>
              Profile
            </Link>
          </MenuItem>,
          <MenuItem
            key='menu-item-logout'
            onClick={logoutHandler}
            className={menuItemLogoutClass}
          >
            <Typography variant='body1'>Logout</Typography>
          </MenuItem>,
        ]
      ) : (
        <MenuItem>
          <Link component={RouterLink} to='/login' underline='none'>
            <Button variant='contained' color='primary'>
              Sign In
            </Button>
          </Link>
        </MenuItem>
      )}
    </Menu>
  );
};

export default HeaderMenu;
