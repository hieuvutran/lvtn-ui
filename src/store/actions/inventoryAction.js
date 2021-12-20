import API from 'src/api';
import swal from 'sweetalert2';
import { push } from 'connected-react-router';
import RoutesString from 'src/routes/routesString';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {changeAuthState} from './authAction';

export const getInventory = createAsyncThunk(
    'inventory/get',
    async (values, thunk) => {
      try {
        const res = await API({
          url: '/furnitures',
          method: 'get',
          params: values.query || {}
        });
        const data = {
            inventory: res?.data || [],
          success: false
        };
        return data;
      } catch (e) {
        return console.error(e.message);
      }
    }
  );

  export const deleteInventory = createAsyncThunk(
    'inventory/delete',
    async (values, thunk) => {
      try {
        const res = await API({
          url: `/furnitures/${values.id}`,
          method: 'delete',
        });
        const isSuccess = res.code === 200;

          if (isSuccess) {
            swal.fire('Deleted!', 'Đã được xóa!', 'success').then(d => thunk.dispatch(getInventory({})));
          } else {
            swal.fire({
              title: 'Xóa thất bại',
              text: res.message,
              icon: 'error'
            });
          }
          return {
            success: isSuccess
          };
        return data;
      } catch (e) {
        return console.error(e.message);
      }
    }
  );