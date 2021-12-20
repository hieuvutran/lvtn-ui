import API from 'src/api';
import { foodsSlice } from '../slices/foodsSlice';
import swal from 'sweetalert2';
import { push } from 'connected-react-router';
import RoutesString from 'src/routes/routesString';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getMenu = createAsyncThunk(
  'foods/getMenu',
  async (params = {}) => {
    const response = await API({
      url: '/foods',
      method: 'GET',
      params
    });
    // console.log('response.data', response.data);
    const data = {
      listMenu: response?.data || [],
      success: false
    };
    return data;
  }
);

export const createMenu = createAsyncThunk(
  'foods/createMenu',
  async (values, thunk) => {
    const response = await API({
      url: '/menu',
      method: 'POST',
      data: values
    });
    const isSuccess = response.code === 200;
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
              thunk.dispatch(push(RoutesString.Foods));
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
  }
);

export const getFoods = createAsyncThunk('foods/get', async () => {
  const response = await API({
    url: '/foods',
    method: 'GET'
  });
  const data = {
    foods: response.data,
    success: false
  };
  return data;
});
export const createFood = createAsyncThunk(
  'foods/create',
  async (values, thunk) => {
    console.log(values)
    try {
      const res = await API({
        url: '/foods',
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
              thunk.dispatch(push(RoutesString.Foods));
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

export const updateFood = createAsyncThunk(
  'foods/update',
  async (values, thunk) => {
    try {
      const res = await API({
        url: `/foods/${values._id}`,
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
              thunk.dispatch(push(RoutesString.Foods));
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

export const deleteFood = createAsyncThunk('foods/delete', async (id) => {
  try {
    return swal
      .fire({
        title: 'Xóa thức ăn',
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
            url: `/foods/${id}`,
            method: 'delete'
          });
          const isSuccess = res.code === 200;

          if (isSuccess) {
            swal.fire('Deleted!', 'Thức ăn đã được xóa!', 'success');
          } else {
            swal.fire({
              title: 'Xóa thất bại',
              text: res.message,
              icon: 'error'
            });
          }
          return {
            success: true
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
