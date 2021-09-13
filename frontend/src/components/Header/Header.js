import { useState } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import cartSubtotalHelper from '../../helpers/cartSubtotalHelper';
import AccountMenu from './AccountMenu';
import AdminMenu from './AdminMenu';
import MobileMenu from './MobileMenu';
import Navbar from './Navbar';
import { logout } from '../../actions/userActions';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    marginBottom: theme.spacing(3),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  titleAltMobile: {
    display: 'inline-block',
    width: '25px',
    height: 'auto',
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.down('lg')]: {
      width: '50ch',
      '&:focus': {
        width: '80ch',
      },
    },
    [theme.breakpoints.down('md')]: {
      width: '35ch',
      '&:focus': {
        width: '48ch',
      },
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      '&:focus': {
        width: '100%',
      },
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  tooltip: {
    backgroundColor: theme.palette.primary.main,
    fontSize: '12px',
  },
  arrow: {
    color: theme.palette.common.black,
  },
  menuItemLogoutClass: {
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
    },
  },
}));

const Header = () => {
  // initializations
  const classes = useStyles();
  const dispatch = useDispatch();

  // states
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);
  const [adminAnchorEl, setAdminAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isAccountMenuOpen = Boolean(accountAnchorEl);
  const isAdminMenuOpen = Boolean(adminAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // handlers
  const handleAccountMenuOpen = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleAdminMenuOpen = (event) => {
    setAdminAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAccountAnchorEl(null);
    setAdminAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  // ids
  const accountMenuId = 'account-menu';
  const adminMenuId = 'admin-menu';
  const mobileMenuId = 'mobile-menu';

  // user
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // cart
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { cartSubtotalCount, cartSubtotalPrice } =
    cartSubtotalHelper(cartItems);

  // tooltip
  const cartTooltipTitle = cartSubtotalCount
    ? `${cartSubtotalCount} ${
        cartSubtotalCount === 1 ? 'item' : 'items'
      } at ₦${cartSubtotalPrice}`
    : 'Your Cart is empty';

  const cartTooltipAriaLabel = cartSubtotalCount
    ? `show ${cartTooltipTitle}`
    : 'Your cart is empty';

  return (
    <div className={classes.grow}>
      <Navbar
        accountMenuId={accountMenuId}
        adminMenuId={adminMenuId}
        cartSubtotalCount={cartSubtotalCount}
        cartTooltipTitle={cartTooltipTitle}
        cartTooltipAriaLabel={cartTooltipAriaLabel}
        classes={classes}
        handleAccountMenuOpen={handleAccountMenuOpen}
        handleAdminMenuOpen={handleAdminMenuOpen}
        handleMobileMenuOpen={handleMobileMenuOpen}
        mobileMenuId={mobileMenuId}
        userInfo={userInfo}
      />

      <MobileMenu
        accountMenuId={accountMenuId}
        adminMenuId={adminMenuId}
        cartSubtotalCount={cartSubtotalCount}
        cartTooltipAriaLabel={cartTooltipAriaLabel}
        cartTooltipTitle={cartTooltipTitle}
        classes={classes}
        handleAdminMenuOpen={handleAdminMenuOpen}
        handleAccountMenuOpen={handleAccountMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        isMobileMenuOpen={isMobileMenuOpen}
        mobileMenuId={mobileMenuId}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        userInfo={userInfo}
      />

      <AccountMenu
        accountAnchorEl={accountAnchorEl}
        accountMenuId={accountMenuId}
        handleMenuClose={handleMenuClose}
        isAccountMenuOpen={isAccountMenuOpen}
        logoutHandler={logoutHandler}
        menuItemLogoutClass={classes.menuItemLogoutClass}
        userInfo={userInfo}
      />

      <AdminMenu
        adminAnchorEl={adminAnchorEl}
        adminMenuId={adminMenuId}
        isAdminMenuOpen={isAdminMenuOpen}
        handleMenuClose={handleMenuClose}
        userInfo={userInfo}
      />
    </div>
  );
};

export default Header;
