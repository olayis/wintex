import { useState } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import cartSubtotalHelper from '../../helpers/cartSubtotalHelper';
import LinearLoader from '../Loaders/LinearLoader';
import HeaderMenu from './HeaderMenu';
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
        width: '89ch',
      },
    },
    [theme.breakpoints.down('md')]: {
      width: '35ch',
      '&:focus': {
        width: '53ch',
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // handlers
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  // ids
  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

  // screen loader
  const screenLoad = useSelector((state) => state.screenLoad);
  const { loading: screenLoading } = screenLoad;

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
      {screenLoading && <LinearLoader variant='indeterminate' />}
      <Navbar
        cartSubtotalCount={cartSubtotalCount}
        classes={classes}
        handleMobileMenuOpen={handleMobileMenuOpen}
        handleProfileMenuOpen={handleProfileMenuOpen}
        menuId={menuId}
        mobileMenuId={mobileMenuId}
        cartTooltipTitle={cartTooltipTitle}
        cartTooltipAriaLabel={cartTooltipAriaLabel}
        userInfo={userInfo}
      />
      <MobileMenu
        cartSubtotalCount={cartSubtotalCount}
        classes={classes}
        handleMobileMenuClose={handleMobileMenuClose}
        handleProfileMenuOpen={handleProfileMenuOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        mobileMenuId={mobileMenuId}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        cartTooltipTitle={cartTooltipTitle}
        cartTooltipAriaLabel={cartTooltipAriaLabel}
        userInfo={userInfo}
      />
      <HeaderMenu
        anchorEl={anchorEl}
        menuId={menuId}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
        userInfo={userInfo}
        logoutHandler={logoutHandler}
        menuItemLogoutClass={classes.menuItemLogoutClass}
      />
    </div>
  );
};

export default Header;
