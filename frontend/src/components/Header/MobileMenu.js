import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';

const MobileMenu = ({
  classes,
  mobileMoreAnchorEl,
  mobileMenuId,
  isMobileMenuOpen,
  handleMobileMenuClose,
  cartSubtotalPrice,
  cartSubtotalCount,
  handleProfileMenuOpen,
}) => {
  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Link component={RouterLink} to='/cart' underline='none'>
          <Tooltip
            arrow
            classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
            title={`${cartSubtotalCount} items at ₦ ${cartSubtotalPrice}`}
          >
            <IconButton
              aria-label={`show ${Number(cartSubtotalCount)} items at ${Number(
                cartSubtotalPrice
              )} Naira`}
              color='secondary'
            >
              <Badge badgeContent={4} color='primary'>
                <ShoppingCartIcon color='primary' />
              </Badge>
            </IconButton>
          </Tooltip>
          <p style={{ display: 'inline-block' }}>Cart</p>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
};

export default MobileMenu;
