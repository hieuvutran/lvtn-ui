import API from 'src/api';
import { bookingSlice } from '../slices/bookingSlice';
import swal from 'sweetalert2';
import { push } from 'connected-react-router';
import RoutesString from 'src/routes/routesString';
import { createAsyncThunk } from '@reduxjs/toolkit';
import QRCode from 'react-qr-code';
import { openModal } from './modalAction';
export const getBookings = createAsyncThunk('booking/get', async (values) => {
  const response = await API({
    url: '/booking',
    method: 'GET',
    params: values?.query || {}
  });
  const data = {
    booking: response?.data || [],
    success: false
  };
  return data;
});
export const createBooking = createAsyncThunk(
  'booking/create',
  async (values, thunk) => {
    try {
      const res = await API({
        url: '/booking',
        method: 'post',
        data: values
      });
      const isSuccess = res.code === 200;
      if (isSuccess) {
        thunk.dispatch(openModal({isOpen: true, value: res.data.qrCode || ''}))
        thunk.dispatch(push(RoutesString.CUSTOMER_CHECKIN));
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

export const updateBooking = createAsyncThunk(
  'booking/update',
  async (values, thunk) => {
    try {
      const res = await API({
        url: `/booking/${values._id}`,
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
              thunk.dispatch(push(RoutesString.Bookings));
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

export const deleteBooking = createAsyncThunk('booking/delete', async (id) => {
  try {
    return swal
      .fire({
        title: 'Xóa booking',
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
            url: `/booking/${id}`,
            method: 'delete'
          });
          const isSuccess = res.code === 200;

          if (isSuccess) {
            swal.fire('Deleted!', 'booking đã được xóa!', 'success');
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

export const getCheckIn = createAsyncThunk('booking/get', async (values) => {
  const response = await API({
    url: '/customers-check-in',
    method: 'GET',
    params: values?.query || {}
  });
  const data = {
    checkIn: response.data,
    success: false
  };
  return data;
});