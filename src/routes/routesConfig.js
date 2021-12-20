import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { USER_ROLE } from 'src/constants/enums';
import AnonymousGuard from 'src/guards/AnonymousGuard';
import AuthGuard from 'src/guards/AuthGuard';
import OrderCreateCustomers from 'src/pages/CreateOrdersCustomers';
import RoutesString from './routesString';
const Error404Page = lazy(() => import('../pages/NotFound'));
const AccountPage = lazy(() => import('../pages/Account'));
const DashboardPage = lazy(() => import('../pages/Dashboard'));
const ProductsPage = lazy(() => import('../pages/ProductList'));
const CustomersPage = lazy(() => import('../pages/CustomerList'));
const FurniturePage = lazy(() => import('../pages/FunitureList'));
const FurnitureCreatePage = lazy(() => import('../pages/FurnitureCreate'));
const FurnitureTypeCreate = lazy(() => import('../pages/FurnitureTypeCreate'));
const FoodsPage = lazy(() => import('../pages/FoodList'));
const FoodCreatePage = lazy(() => import('../pages/FoodCreate'));
const MenuCreatePage = lazy(() => import('../pages/MenuCreate'));
const RoomCreatePage = lazy(() => import('../pages/RoomCreate'));
const RoomTypeCreatePage = lazy(() => import('../pages/RoomTypeCreate'));
const RoomTypePage = lazy(() => import('../pages/RoomTypeList'));
const HotelCreatePage = lazy(() => import('../pages/HotelCreate'));
const AccountCreatePage = lazy(() => import('../pages/AccountCreate'));
const CustomerCreatePage = lazy(() => import('../pages/CustomerCreate'));
const EmployeeCreatePage = lazy(() => import('../pages/EmployeeCreate'));
const HotelsPage = lazy(() => import('../pages/HotelList'));
const EmployeesPage = lazy(() => import('../pages/EmployeeList'));
const RoomsPage = lazy(() => import('../pages/RoomList'));
const AccountsPage = lazy(() => import('../pages/AccountList'));
const BookingPage = lazy(() => import('../pages/Booking'));
const BookingListPage = lazy(() => import('../pages/BookingList'));
const WorkingListPage = lazy(() => import('../pages/WorkingList'));
const CheckInListPage = lazy(() => import('../pages/CheckInList'));
const InventoryListPage = lazy(() => import('../pages/WareHouse'));
const WareHouseCreatePage = lazy(()=> import('../pages/WareHouseCreate'))
const WorkingHistoryListPage = lazy(() => import('../pages/workingHistory'));
const BookingCustomerPage = lazy(() => import('../pages/Booking-Customer'));
const CheckInCustomerPage = lazy(() => import('../pages/CustomerCheckIn'));
const OrdersPage = lazy(() => import('../pages/OrderList'));
const OrderCreatePage = lazy(() => import('../pages/OrderCreate'));

const LoginPage = lazy(() => import('../pages/Login'));

const DashboardLayout = lazy(() => import('../components/DashboardLayout'));
const MainLayout = lazy(() => import('../components/MainLayout'));

export const routesConfig = [
  {
    layout: MainLayout,
    guard: AnonymousGuard,
    path: '/booking',
    page: BookingCustomerPage,
    exact: true
  },
  {
    layout: MainLayout,
    guard: AnonymousGuard,
    path: '/customers-check-in',
    page: CheckInCustomerPage,
    exact: true
  },
  {
    layout: MainLayout,
    guard: AnonymousGuard,
    path: '/customers/orders',
    page: OrderCreateCustomers,
    exact: true
  },
  {
    page: Error404Page,
    path: RoutesString.Error404,
    exact: true
  },
  {
    layout: DashboardLayout,
    path: RoutesString.DashboardLayout,
    guard: AuthGuard,
    routes: [
      {
        page: DashboardPage,
        path: RoutesString.Dashboard,
        exact: true,
        requireRoles: [
          USER_ROLE.ADMIN,
          USER_ROLE.CUSTOMER,
          USER_ROLE.EMPLOYEE,
          USER_ROLE.MANAGEMENT
        ]
      },
      {
        page: AccountPage,
        path: RoutesString.Account,
        exact: true,
        requireRoles: [
          USER_ROLE.ADMIN,    
          USER_ROLE.MANAGEMENT]
      },

      {
        page: ProductsPage,
        path: RoutesString.Products,
        exact: true,
        requireRoles: [
          USER_ROLE.ADMIN,
          USER_ROLE.CUSTOMER,
          USER_ROLE.EMPLOYEE,
          USER_ROLE.MANAGEMENT
        ]
      },
      {
        page: CustomersPage,
        path: RoutesString.Customers,
        exact: true,
        requireRoles: [
          USER_ROLE.ADMIN,
          USER_ROLE.CUSTOMER,
          USER_ROLE.EMPLOYEE,
          USER_ROLE.MANAGEMENT
        ]
      },
      {
        page: AccountCreatePage,
        path: RoutesString.AccountUpdate,
        requireRoles: [USER_ROLE.ADMIN]
      },
      {
        page: FurniturePage,
        path: RoutesString.Furniture,
        exact: true,
        requireRoles: [
          USER_ROLE.ADMIN,
          USER_ROLE.EMPLOYEE,
          USER_ROLE.MANAGEMENT
        ]
      },
      {
        page: WorkingListPage,
        path: RoutesString.WorkingList,
        exact: true,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT]
      },
      {
        page: WorkingHistoryListPage,
        path: RoutesString.WorkingHistoryList,
        exact: true,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT]
      },
      {
        page: BookingListPage,
        path: RoutesString.BookingList,
        exact: true,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT, USER_ROLE.EMPLOYEE]
      },
      {
        page: CheckInListPage,
        path: RoutesString.CheckInList,
        exact: true,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT, USER_ROLE.EMPLOYEE]
      },
      {
        page: InventoryListPage,
        path: RoutesString.InventoryList,
        exact: true,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT, USER_ROLE.EMPLOYEE]
      },
      {
        page: FurnitureCreatePage,
        path: RoutesString.FurnitureCreate,
        exact: true,
        requireRoles: [
          USER_ROLE.ADMIN,
          USER_ROLE.EMPLOYEE,
          USER_ROLE.MANAGEMENT
        ]
      },
      {
        page: FurnitureTypeCreate,
        path: RoutesString.FurnitureTypeCreate,
        exact: true,
        requireRoles: [
          USER_ROLE.ADMIN,
          USER_ROLE.EMPLOYEE,
          USER_ROLE.MANAGEMENT
        ]
      },
      {
        page: FurnitureCreatePage,
        path: RoutesString.FurnitureUpdate,
        // exact: true,
        requireRoles: [
          USER_ROLE.ADMIN,
          USER_ROLE.EMPLOYEE,
          USER_ROLE.MANAGEMENT
        ]
      },
      {
        page: FoodsPage,
        path: RoutesString.Foods,
        exact: true,
        requireRoles: [
          USER_ROLE.ADMIN,
          USER_ROLE.EMPLOYEE,
          USER_ROLE.MANAGEMENT
        ]
      },
      {
        page: MenuCreatePage,
        path: RoutesString.MenuCreate,
        exact: true,
        requireRoles: [
          USER_ROLE.ADMIN,
          USER_ROLE.EMPLOYEE,
          USER_ROLE.MANAGEMENT
        ]
      },
      {
        page: FoodCreatePage,
        path: RoutesString.FoodCreate,
        exact: true,
        requireRoles: [
          USER_ROLE.ADMIN,
          USER_ROLE.EMPLOYEE,
          USER_ROLE.MANAGEMENT
        ]
      },
      {
        page: FoodCreatePage,
        path: RoutesString.FoodUpdate,
        exact: true,
        requireRoles: [
          USER_ROLE.ADMIN,
          USER_ROLE.EMPLOYEE,
          USER_ROLE.MANAGEMENT
        ]
      },
      {
        page: RoomCreatePage,
        path: RoutesString.RoomCreate,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT]
      },
      {
        page: WareHouseCreatePage,
        path: RoutesString.WareHouseCreate,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT, USER_ROLE.EMPLOYEE]
      },
      {
        page: WareHouseCreatePage,
        path: RoutesString.WareHouseUpdate,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT, USER_ROLE.EMPLOYEE]
      },
      {
        page: RoomTypeCreatePage,
        path: RoutesString.RoomTypeCreate,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT]
      },
      {
        page: RoomTypeCreatePage,
        path: RoutesString.RoomTypeUpdate,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT]
      },
      {
        page: RoomTypePage,
        path: RoutesString.RoomType,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT]
      },
      {
        page: RoomCreatePage,
        path: RoutesString.RoomUpdate,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT]
      },
      {
        page: CustomerCreatePage,
        path: RoutesString.CustomerCreate,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT]
      },
      {
        page: CustomerCreatePage,
        path: RoutesString.CustomerUpdate,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT]
      },
      {
        page: EmployeeCreatePage,
        path: RoutesString.EmployeeCreate,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT]
      },
      {
        page: EmployeeCreatePage,
        path: RoutesString.EmployeeUpdate,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT]
      },
      {
        page: HotelCreatePage,
        path: RoutesString.HotelCreate,
        requireRoles: [USER_ROLE.ADMIN]
      },
      {
        page: HotelCreatePage,
        path: RoutesString.HotelUpdate,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT]
      },
      {
        page: AccountCreatePage,
        path: RoutesString.AccountCreate,
        requireRoles: [USER_ROLE.ADMIN]
      },
      {
        page: HotelsPage,
        path: RoutesString.Hotels,
        exact: true,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT]
      },
      {
        page: EmployeesPage,
        path: RoutesString.Employees,
        exact: true,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT]
      },
      {
        page: AccountsPage,
        path: RoutesString.Accounts,
        exact: true,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT]
      },
      {
        page: RoomsPage,
        path: RoutesString.Rooms,
        exact: true,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT]
      },
      {
        page: OrdersPage,
        path: RoutesString.Orders,
        exact: true,
        requireRoles: [
          USER_ROLE.ADMIN,
          USER_ROLE.CUSTOMER,
          USER_ROLE.EMPLOYEE,
          USER_ROLE.MANAGEMENT
        ]
      },
      {
        page: OrderCreatePage,
        path: RoutesString.OrderCreate,
        exact: true,
        requireRoles: [
          USER_ROLE.ADMIN,
          USER_ROLE.CUSTOMER,
          USER_ROLE.EMPLOYEE,
          USER_ROLE.MANAGEMENT
        ]
      },
      {
        page: OrderCreatePage,
        path: RoutesString.OrderUpdate,
        exact: true,
        requireRoles: [
          USER_ROLE.ADMIN,
          USER_ROLE.CUSTOMER,
          USER_ROLE.EMPLOYEE,
          USER_ROLE.MANAGEMENT
        ]
      },
      {
        page: () => <Redirect to={RoutesString.Error404} />
      }
    ]
  },
  {
    layout: MainLayout,
    guard: AnonymousGuard,
    path: RoutesString.MainLayout,
    routes: [
      {
        page: LoginPage,
        path: RoutesString.Login
      },
      {
        page: () => <Redirect to={RoutesString.Error404} />
      }
    ]
  },
  {
    page: Error404Page,
    path: '*'
  }
];
