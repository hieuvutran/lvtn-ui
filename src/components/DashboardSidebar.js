import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  Home as HomeIcon,
  Trello as TrelloIcon,
  Smartphone as SmartphoneIcon,
  PieChart as PieChartIcon,
  Calendar, Server, UserCheck, Clock, Edit
} from 'react-feather';
import NavItem from './NavItem';
import RoutesString from 'src/routes/routesString';
import { USER_ROLE } from 'src/constants/enums';
import { useSelector } from 'react-redux';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
};

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard',
    requireRoles: [
      USER_ROLE.MANAGEMENT,
      USER_ROLE.EMPLOYEE,
      USER_ROLE.ADMIN
    ]
  },
  {
    href: RoutesString.BookingList,
    icon: Calendar,
    title: 'Booking',
    requireRoles: [USER_ROLE.MANAGEMENT, USER_ROLE.ADMIN]
  },
  {
    href: RoutesString.CheckInList,
    icon: UserCheck,
    title: 'Check-In',
    requireRoles: [USER_ROLE.MANAGEMENT, USER_ROLE.ADMIN]
  },
  {
    href: RoutesString.WorkingList,
    icon: Clock,
    title: 'Điểm danh',
    requireRoles: [USER_ROLE.MANAGEMENT, USER_ROLE.ADMIN]
  },
  {
    href: RoutesString.Foods,
    icon: PieChartIcon,
    title: 'Menu',
    requireRoles: [
      USER_ROLE.MANAGEMENT,
      USER_ROLE.EMPLOYEE,
      USER_ROLE.ADMIN
    ]
  },

  {
    href: RoutesString.Furniture,
    icon: TrelloIcon,
    title: 'Nội thất',
    requireRoles: [
      USER_ROLE.MANAGEMENT,
      USER_ROLE.EMPLOYEE,
      USER_ROLE.ADMIN
    ]
  },
  {
    href: RoutesString.Employees,
    icon: UsersIcon,
    title: 'Nhân viên',
    requireRoles: [USER_ROLE.MANAGEMENT, USER_ROLE.ADMIN]
  },

  {
    href: RoutesString.InventoryList,
    icon: Server,
    title: 'Kho',
    requireRoles: [USER_ROLE.MANAGEMENT, USER_ROLE.ADMIN, USER_ROLE.EMPLOYEE]
  },
  {
    href: RoutesString.Orders,
    icon: Edit,
    title: 'Orders',
    requireRoles: [USER_ROLE.MANAGEMENT, USER_ROLE.ADMIN, USER_ROLE.EMPLOYEE]
  },
  {
    href: RoutesString.Hotels,
    icon: HomeIcon,
    title: 'Khách sạn',
    requireRoles: [USER_ROLE.MANAGEMENT,USER_ROLE.ADMIN]
  },
  {
    href: RoutesString.RoomType,
    icon: SmartphoneIcon,
    title: 'Loại Phòng',
    requireRoles: [USER_ROLE.MANAGEMENT, USER_ROLE.ADMIN]
  },
  {
    href: RoutesString.Rooms,
    icon: SmartphoneIcon,
    title: 'Phòng',
    requireRoles: [USER_ROLE.MANAGEMENT, USER_ROLE.ADMIN]
  },
  {
    href: RoutesString.Accounts,
    icon: UserIcon,
    title: 'Tài khoản',
    requireRoles: [USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT]
  }
  // {
  //   href: '/app/products',
  //   icon: ShoppingBagIcon,
  //   title: 'Products'
  // },
  // {
  //   href: '/app/account',
  //   icon: UserIcon,
  //   title: 'Account'
  // },
  // {
  //   href: '/app/settings',
  //   icon: SettingsIcon,
  //   title: 'Settings'
  // },
  // {
  //   href: '/login',
  //   icon: LockIcon,
  //   title: 'Login'
  // },
  // {
  //   href: '/register',
  //   icon: UserPlusIcon,
  //   title: 'Register'
  // },
  // {
  //   href: '/404',
  //   icon: AlertCircleIcon,
  //   title: 'Error'
  // }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const role = user?.role || '';

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        {/* <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/account"
        /> */}
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => {
            const checkRole = item.requireRoles.includes(role);
            if (checkRole) {
              return (
                <NavItem
                  href={item.href}
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                />
              );
            }
          })}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden xlDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default DashboardSidebar;
