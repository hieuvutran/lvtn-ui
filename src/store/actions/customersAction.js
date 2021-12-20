import API from 'src/api';
import { customersSlice } from '../slices/customersSlice';
import swal from 'sweetalert2';
import { push } from 'connected-react-router';
import RoutesString from 'src/routes/routesString';
import { createAsyncThunk } from '@reduxjs/toolkit';
export const getCustomers = createAsyncThunk('customers/get', async () => {
  const response = await API({
    url: '/customers',
    method: 'GET'
  });
  const data = {
    customers: response?.data || [],
    success: false
  };
  return data;
});
export const createCustomer = createAsyncThunk(
  'customers/create',
  async (values, thunk) => {
    try {
      const res = await API({
        url: '/customers',
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
              thunk.dispatch(push(RoutesString.Customers));
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

export const updateCustomer = createAsyncThunk(
  'customers/update',
  async (values, thunk) => {
    try {
      const res = await API({
        url: `/customers/${values._id}`,
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
              thunk.dispatch(push(RoutesString.Customers));
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

export const deleteCustomer = createAsyncThunk(
  'customers/delete',
  async (id) => {
    try {
      swal
        .fire({
          title: 'Xóa khách hàng',
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
              url: `/customers/${id}`,
              method: 'delete'
            });
            const isSuccess = res.code === 200;

            if (isSuccess) {
              swal.fire('Deleted!', 'khách hàng đã được xóa!', 'success');
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
      return {
        success: false
      };
    } catch (e) {
      return console.error(e.message);
    }
  }
);
