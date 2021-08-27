import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';

const MobileMenu = ({
  classes,
  mobileMoreAnchorEl,
  mobileMenuId,
  isMobileMenuOpen,
  handleMobileMenuClose,
  cartSubtotalCount,
  handleProfileMenuOpen,
  cartTooltipTitle,
  cartTooltipAriaLabel,
  userInfo,
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
            title={cartTooltipTitle}
          >
            <IconButton aria-label={cartTooltipAriaLabel} color='secondary'>
              <Badge badgeContent={cartSubtotalCount} color='primary'>
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
        {userInfo ? (
          <Typography noWrap>{userInfo.name}</Typography>
        ) : (
          <p>Account</p>
        )}
      </MenuItem>
    </Menu>
  );
};

export default MobileMenu;
