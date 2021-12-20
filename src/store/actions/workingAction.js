import API from 'src/api';
import swal from 'sweetalert2';
import { push } from 'connected-react-router';
import RoutesString from 'src/routes/routesString';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {changeAuthState} from './authAction';

export const checkIn = createAsyncThunk(
  'workingDay/checkIn',
  async (values, thunk) => {
    try {
      const res = await API({
        url: '/working-times/check-in',
        method: 'post',
      });
      const isSuccess = res.code === 200;
      if (isSuccess) {
        swal
          .fire({
            title: 'Thành công',
            text: 'Thành công',
            icon: 'success',
            showCancelButton: false,
            // confirmButtonText: 'Có',
            // cancelButtonText: 'Không'
          })
          .then((result) => {
            if (result.value) {
              console.log(thunk.getState())
              thunk.dispatch(changeAuthState({user: {
                ...thunk.getState().auth.user,
                checkIn: res?.data?.checkIn || null
              }}))
              thunk.dispatch(push(RoutesString.Rooms));
            }
          });
      } else {
        swal.fire({
          title: 'Thất bại',
          text: res.message,
          icon: 'error'
        });
      }
      return {
        success: isSuccess
      };
    } catch (e) {
      return console.error(e.message);
    }
  }
);

export const checkout = createAsyncThunk(
  'workingDay/checkOut',
  async (values, thunk) => {
    try {
      const res = await API({
        url: '/working-times/check-out',
        method: 'put',
      });
      const isSuccess = res.code === 200;
      if (isSuccess) {
        swal
          .fire({
            title: 'Thành công',
            text: 'Thành công',
            icon: 'success',
            showCancelButton: false,
            // confirmButtonText: 'Có',
            // cancelButtonText: 'Không'
          })
          .then((result) => {
            if (result.value) {
              thunk.dispatch(push(RoutesString.Rooms));
            }
          });
      } else {
        swal.fire({
          title: 'Thất bại',
          text: res.message,
          icon: 'error'
        });
      }
      return {
        success: isSuccess
      };
    } catch (e) {
      return console.error(e.message);
    }
  }
);


export const getWorkingDay = createAsyncThunk(
  'workingDay/get',
  async (values, thunk) => {
    try {
      const res = await API({
        url: '/working-times',
        method: 'get',
        params: values.query || {}
      });
      const data = {
        workingDay: res?.data || [],
        success: false
      };
      return data;
    } catch (e) {
      return console.error(e.message);
    }
  }
);
export const getWorkingMonth = createAsyncThunk(
  'workingDay/get',
  async (values, thunk) => {
    try {
      const res = await API({
        url: '/working-times/month',
        method: 'get',
        params: values.query || {}
      });
      const data = {
        workingMonth: res?.data || [],
        success: false
      };
      return data;
    } catch (e) {
      return console.error(e.message);
    }
  }
);

export const getWorkingToDayDay = createAsyncThunk(
  'workingDay/get',
  async (values, thunk) => {
    try {
      const res = await API({
        url: '/working-today',
        method: 'get',
        params: values || {}
      });
      const data = {
        workingToday: res?.data || [],
        success: false
      };
      return data;
    } catch (e) {
      return console.error(e.message);
    }
  }
);

export const getWorkingDayHistory = createAsyncThunk(
  'workingDay/get',
  async (values, thunk) => {
    try {
      const res = await API({
        url: '/working-times/history',
        method: 'get',
        params: values.query || {}
      });
      const data = {
        workingDayHistory: res?.data || [],
        success: false
      };
      return data;
    } catch (e) {
      return console.error(e.message);
    }
  }
);