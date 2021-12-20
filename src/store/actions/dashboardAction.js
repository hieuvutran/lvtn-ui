import API from 'src/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getDashBoard = createAsyncThunk(
    'dashboard/get',
    async (values, thunk) => {
      try {
        console.log("1234")
        const res = await API({
          url: '/dashboard',
          method: 'GET',
        });
        const data = {
            dashboard: res?.data || [],
        };
        return data;
      } catch (e) {
        return console.error(e.message);
      }
    }
  );
