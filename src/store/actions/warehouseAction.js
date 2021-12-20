import API from 'src/api';
import swal from 'sweetalert2';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { openModal } from './modalAction';
import {getRooms} from './roomsAction'

export const getWarehouse = createAsyncThunk('warehouse/get', async () => {
  const response = await API({
    url: '/warehouse',
    method: 'GET'
  });
  const data = {
    stock: response?.data || [],
    success: false
  };
  return data;
});




export const createWarehouse = createAsyncThunk(
  'Warehouse/create',
  async (values, thunk) => {
    try {
      const res = await API({
        url: '/warehouse',
        method: 'post',
        data: values
      });
      const isSuccess = res.code === 200;
      if (isSuccess) {
        swal
          .fire({
            title: 'Thêm thành công',
            text: 'Thêm thành công, bạn có xem QR code?',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
          })
          .then((result) => {
            if (result.value) {
              thunk.dispatch(
                openModal({
                  isOpen: true,
                  value: res.data.qrCode
                })
              );
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



export const updateWareHouse = createAsyncThunk(
  'warehouse/update',
  async (values, thunk) => {
    try {
      const res = await API({
        url: `/warehouse/${values._id}`,
        method: 'put',
        data: values
      });
      const isSuccess = res.code === 200;
      if (isSuccess) {
        swal
          .fire({
            title: 'Chỉnh sửa thành công',
            text: 'Chỉnh sửa thành công, bạn có muốn xem mã QR code không?',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
          })
          .then((result) => {
            if (result.value) {
              thunk.dispatch(
                openModal({
                  isOpen: true,
                  value: res.data.qrCode
                })
              );
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

export const deleteWareHouse = createAsyncThunk(
  'warehouse/delete',
  async (id, thunk) => {
    try {
      return swal
        .fire({
          title: 'Xóa nội thất',
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
              url: `/warehouse/${id}`,
              method: 'delete'
            });
            const isSuccess = res.code === 200;

            if (isSuccess) {
              swal.fire('Deleted!', 'Nội thất đã được xóa!', 'success').then(d => thunk.dispatch(getWarehouse()));
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
  }
);
