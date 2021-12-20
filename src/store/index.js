import { configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import foods from './slices/foodsSlice';
import orders from './slices/ordersSlice';
import hotels from './slices/hotelsSlice';
import accounts from './slices/accountsSlice';
import customers from './slices/customersSlice';
import employee from './slices/employeeSlice';
import rooms from './slices/roomsSlice';
import furnitures from './slices/furnituresSlice';
import booking from './slices/bookingSlice';
import auth from './slices/authSlice';
import working from './slices/workingSlice';
import inventory from './slices/inventorySlide';
import modal from './slices/modalSlice';
import dashboard from './slices/dashboardSlice'
import warehouse from './slices/warehouseSlice'
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
};
const createRootReducer = (history) =>
  combineReducers({
    foods,
    hotels,
    accounts,
    employee,
    rooms,
    customers,
    furnitures,
    booking,
    auth,
    orders,
    modal,
    working,
    inventory,
    dashboard,
    warehouse,
    router: connectRouter(history)
  });
export const history = createBrowserHistory();
const store = configureStore({
  reducer: persistReducer(persistConfig, createRootReducer(history)),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false,}).concat(routerMiddleware(history))
});

export default store;
