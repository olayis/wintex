import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';
import wintexImage from '../../static/images/wintex_w_white.svg';

const Navbar = ({
  classes,
  cartSubtotalCount,
  handleMobileMenuOpen,
  handleProfileMenuOpen,
  menuId,
  mobileMenuId,
  cartTooltipTitle,
  cartTooltipAriaLabel,
  userInfo,
}) => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Link component={RouterLink} to='/' underline='none'>
          <Typography
            className={classes.title}
            variant='h6'
            color='secondary'
            noWrap
          >
            Wintex
          </Typography>
          <img className={classes.titleAltMobile} src={wintexImage} alt='W' />
        </Link>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder='Search for products'
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <Link component={RouterLink} to='/cart' underline='none'>
            <Tooltip
              arrow
              classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
              title={cartTooltipTitle}
            >
              <IconButton aria-label={cartTooltipAriaLabel} color='inherit'>
                <Badge badgeContent={cartSubtotalCount} color='secondary'>
                  <ShoppingCartIcon color='secondary' />
                </Badge>
              </IconButton>
            </Tooltip>
          </Link>
          <IconButton
            edge='end'
            aria-label='account of current user'
            aria-controls={menuId}
            aria-haspopup='true'
            onClick={handleProfileMenuOpen}
            color='inherit'
          >
            <AccountCircle />
            {userInfo ? (
              <div style={{ maxWidth: '13ch' }}>
                <Typography
                  variant='body1'
                  style={{ marginLeft: '8px' }}
                  noWrap
                >
                  {userInfo.name}
                </Typography>
              </div>
            ) : (
              ''
            )}
          </IconButton>
        </div>
        <div className={classes.sectionMobile}>
          <IconButton
            aria-label='show more'
            aria-controls={mobileMenuId}
            aria-haspopup='true'
            onClick={handleMobileMenuOpen}
            color='inherit'
          >
            <MoreIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
