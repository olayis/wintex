import { Route } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';
import wintexImage from '../../static/images/wintex_w_white.svg';
import SearchBox from './SearchBox';

const Navbar = ({
  accountMenuId,
  adminMenuId,
  cartSubtotalCount,
  cartTooltipTitle,
  cartTooltipAriaLabel,
  classes,
  handleAccountMenuOpen,
  handleAdminMenuOpen,
  handleMobileMenuOpen,
  mobileMenuId,
  userInfo,
}) => {
  return (
    <AppBar position='fixed'>
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
          <Route
            render={({ history }) => (
              <SearchBox classes={classes} history={history} />
            )}
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
            aria-controls={accountMenuId}
            aria-haspopup='true'
            onClick={handleAccountMenuOpen}
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

          {userInfo && userInfo.isAdmin && (
            <IconButton
              edge='end'
              aria-label='admin links'
              aria-controls={adminMenuId}
              aria-haspopup='true'
              onClick={handleAdminMenuOpen}
              color='inherit'
            >
              <SupervisedUserCircleIcon />
              <Typography variant='body1' style={{ marginLeft: '8px' }} noWrap>
                Admin
              </Typography>
            </IconButton>
          )}
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
