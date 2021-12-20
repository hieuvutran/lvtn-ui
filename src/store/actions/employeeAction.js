import API from 'src/api';
import { employeeSlice } from '../slices/employeeSlice';
import swal from 'sweetalert2';
import { push } from 'connected-react-router';
import RoutesString from 'src/routes/routesString';
import { createAsyncThunk } from '@reduxjs/toolkit';
export const getEmployee = createAsyncThunk('employee/get', async () => {
  const response = await API({
    url: '/employees',
    method: 'GET'
  });
  const data = {
    employee: response?.data || [],
    success: false
  };
  return data;
});
export const createEmployee = createAsyncThunk(
  'employee/create',
  async (values, thunk) => {
    try {
      const res = await API({
        url: '/employees',
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
              thunk.dispatch(push(RoutesString.Employees));
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

export const updateEmployee = createAsyncThunk(
  'employee/update',
  async (values, thunk) => {
    try {
      const res = await API({
        url: `/employees/${values._id}`,
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
              thunk.dispatch(push(RoutesString.Employees));
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

export const deleteEmployee = createAsyncThunk(
  'employee/delete',
  async (id, thunk) => {
    try {
      swal
        .fire({
          title: 'Xóa nhân viên',
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
              url: `/employees/${id}`,
              method: 'delete'
            });
            const isSuccess = res.code === 200;

            if (isSuccess) {
              swal.fire('Deleted!', 'nhân viên đã được xóa!', 'success').then(d => thunk.dispatch(getEmployee({})));
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
export const uploadImageEmployee = createAsyncThunk(
  'employee/upload',
  async (values, thunk) => {
    try {
      const res = await API({
        url: `/employees/img/${values._id}`,
        method: 'post',
        data: values.data
      });
      const isSuccess = res.code === 200;
      if (isSuccess) {
        thunk.dispatch(push(RoutesString.Employees));
        swal.fire({
          title: 'Chỉnh sửa thành công',
          text: res.message,
          icon: 'success',
        });
      } else {
        swal.fire({
          title: 'Cập nhật thất bại',
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

export const deleteImageEmployee = createAsyncThunk(
  'employee/removeimg',
  async (values, thunk) => {
    try {
      const res = await API({
        url: `/employees/imgupdate/${values._id}`,
        method: 'post',
        data: values.data
      });
      const isSuccess = res.code === 200;
      if (isSuccess) {
        thunk.dispatch(push(RoutesString.Employees));
        swal.fire({
          title: 'Xóa thành công',
          text: res.message,
          icon: 'success',
        });
      } else {
        swal.fire({
          title: 'Cập nhật thất bại',
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