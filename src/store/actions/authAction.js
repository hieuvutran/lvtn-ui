import { createAsyncThunk } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import API from 'src/api';
import RoutesString from 'src/routes/routesString';
import Swal from 'sweetalert2';

export const login = createAsyncThunk('auth/post', async (values, thunk) => {
  try {
    localStorage.clear();
    const response = await API({
      url: '/auth/login',
      method: 'POST',
      data: values
    });
    if(response.code != 200){
      throw new Error(response.message)
    }
    if(response.data.role == "customer"){
      Swal.fire({
        title: 'Message',
        text: 'Sai thông tin, vui lòng nhập lại',
        icon: 'error'
      });
      return response;
      
    }
    const data = {
      user: response.data,
      success: false,
      isLoggedIn: true
    };
    Swal.fire({
      title: 'Message',
      text: 'Đăng nhập thành công',
      icon: 'success'
    }).then((result) => {
      if (result.value) {
        thunk.dispatch(push(RoutesString.Dashboard));
      }
    });
    return data;
  } catch (error) {
    Swal.fire({
      title: 'Message',
      text: 'Sai thông tin, vui lòng nhập lại',
      icon: 'error'
    });
    return {
      error: error
    };
  }
});

export const logout = createAsyncThunk('auth/post', async () => {
  localStorage.clear();
  return {
    isLoggedIn: false,
    user: {}
  };
});

export const changeAuthState = createAsyncThunk('auth/post', async (data) => {
  return data;
});