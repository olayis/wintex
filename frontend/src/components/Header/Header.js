import { useState } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import cartSubtotalHelper from '../../helpers/cartSubtotalHelper';
import ScreenLoader from '../ScreenLoader/ScreenLoader';
import HeaderMenu from './HeaderMenu';
import MobileMenu from './MobileMenu';
import Navbar from './Navbar';

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
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
      '&:focus': {
        width: '85ch',
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
}));

const Header = () => {
  const classes = useStyles();

  // cart
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { cartSubtotalCount, cartSubtotalPrice } =
    cartSubtotalHelper(cartItems);

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

  // ids
  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

  return (
    <div className={classes.grow}>
      <ScreenLoader />

      <Navbar
        cartSubtotalCount={cartSubtotalCount}
        cartSubtotalPrice={cartSubtotalPrice}
        classes={classes}
        handleMobileMenuOpen={handleMobileMenuOpen}
        handleProfileMenuOpen={handleProfileMenuOpen}
        menuId={menuId}
        mobileMenuId={mobileMenuId}
      />

      <MobileMenu
        cartSubtotalCount={cartSubtotalCount}
        cartSubtotalPrice={cartSubtotalPrice}
        classes={classes}
        handleMobileMenuClose={handleMobileMenuClose}
        handleProfileMenuOpen={handleMobileMenuOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        mobileMenuId={mobileMenuId}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
      />

      <HeaderMenu
        anchorEl={anchorEl}
        menuId={menuId}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
      />
    </div>
  );
};

export default Header;
