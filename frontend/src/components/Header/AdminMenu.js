import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const AdminMenu = ({
  adminAnchorEl,
  adminMenuId,
  isAdminMenuOpen,
  handleMenuClose,
  userInfo,
}) => {
  return (
    <>
      {userInfo && userInfo.isAdmin && (
        <Menu
          anchorEl={adminAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={adminMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isAdminMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem>
            <Link component={RouterLink} to='/admin/userlist'>
              Users
            </Link>
          </MenuItem>
          <MenuItem>
            <Link component={RouterLink} to='/admin/productlist'>
              Products
            </Link>
          </MenuItem>
          <MenuItem>
            <Link component={RouterLink} to='/admin/orderlist'>
              Orders
            </Link>
          </MenuItem>
        </Menu>
      )}
    </>
  );
};

export default AdminMenu;
