import API from 'src/api';
import { hotelsSlice } from '../slices/hotelsSlice';
import swal from 'sweetalert2';
import { push } from 'connected-react-router';
import RoutesString from 'src/routes/routesString';
import { createAsyncThunk } from '@reduxjs/toolkit';
export const getHotels = createAsyncThunk('hotels/get', async (params = {}) => {
  const response = await API({
    url: '/hotels',
    method: 'GET',
    params
  });
  const data = {
    hotels: response?.data || [],
    success: false
  };
  return data;
});
export const createHotel = createAsyncThunk(
  'hotels/create',
  async (values, thunk) => {
    try {
      const res = await API({
        url: '/hotels',
        method: 'post',
        data: values
      });
      const isSuccess = res.code === 200;
      if (isSuccess) {
        swal
          .fire({
            title: 'Thêm thành công',
            text: 'Thêm thành công, bạn có muốn chuyển về trang danh sách?',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
          })
          .then((result) => {
            if (result.value) {
              thunk.dispatch(push(RoutesString.Hotels));
            }
          });
      } else {
        swal.fire({
          title: 'Thêm thất bại',
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

export const updateHotel = createAsyncThunk(
  'hotels/update',
  async (values, thunk) => {
    try {
      const res = await API({
        url: `/hotels/${values._id}`,
        method: 'put',
        data: values
      });
      const isSuccess = res.code === 200;
      if (isSuccess) {
        swal
          .fire({
            title: 'Chỉnh sửa thành công',
            text: 'Chỉnh sửa thành công, bạn có muốn chuyển về trang danh sách?',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
          })
          .then((result) => {
            if (result.value) {
              thunk.dispatch(push(RoutesString.Hotels));
            }
          });
      } else {
        swal.fire({
          title: 'Chỉnh sửa thất bại',
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

export const deleteHotel = createAsyncThunk('hotels/delete', async (id) => {
  try {
    return swal
      .fire({
        title: 'Xóa khách sạn',
        text: 'Bạn có chắc là muốn xóa không?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Có, xóa đi'
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const res = await API({
            url: `/hotels/${id}`,
            method: 'delete'
          });
          const isSuccess = res.code === 200;

          if (isSuccess) {
            swal.fire('Deleted!', 'Khách sạn đã được xóa!', 'success');
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
        } else {
          return {
            success: false
          };
        }
      });
  } catch (e) {
    return console.error(e.message);
  }
});
export const getHotelsPublic = createAsyncThunk('hotels/get-public', async (params = {}) => {
  const response = await API({
    url: '/public-hotels',
    method: 'GET',
    params
  });
  const data = {
    publicHotels: response.data,
    success: false
  };
  return data;
});