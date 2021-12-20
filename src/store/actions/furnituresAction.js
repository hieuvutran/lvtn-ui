import API from 'src/api';
import { furnituresSlice } from '../slices/furnituresSlice';
import swal from 'sweetalert2';
import { push } from 'connected-react-router';
import RoutesString from 'src/routes/routesString';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { openModal } from './modalAction';
import {getRooms} from './roomsAction'
export const getFurnitures = createAsyncThunk('furnitures/get', async () => {
  const response = await API({
    url: '/furnitures',
    method: 'GET'
  });
  const data = {
    furnitures: response?.data || [],
    success: false
  };
  return data;
});

// export const searchFurniture = createAsyncThunk(
//   'furnitures/get',
//   async (keyword) => {
//     let params = {};
//     if (keyword) {
//       params.furName = keyword;
//     }
//     const response = await API({
//       url: '/furnitures',
//       method: 'GET',
//       params
//     });
//     const data = {
//       furnitures: response.data,
//       success: false
//     };
//     return data;
//   }
// );

export const getFurnitureTypes = createAsyncThunk(
  'furnitures/get',
  async () => {
    const response = await API({
      url: '/furniture-types',
      method: 'GET'
    });
    const data = {
      furnitureTypes: response.data,
      success: false
    };
    return data;
  }
);

export const createFurniture = createAsyncThunk(
  'furnitures/create',
  async (values, thunk) => {
    try {
      const res = await API({
        url: '/furnitures',
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

export const createFurnitureType = createAsyncThunk(
  'type-furnitures/create',
  async (values, thunk) => {
    try {
      const res = await API({
        url: '/furniture-types',
        method: 'post',
        data: values
      });
      const isSuccess = res.code === 200;
      if (isSuccess) {
        swal
          .fire({
            title: 'Thêm thành công',
            text: 'Thêm thành công',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
          })
          .then((result) => {
            thunk.dispatch(push(RoutesString.FurnitureCreate))
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

export const updateFurniture = createAsyncThunk(
  'furnitures/update',
  async (values, thunk) => {
    try {
      const res = await API({
        url: `/furnitures/${values._id}`,
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

export const deleteFurniture = createAsyncThunk(
  'furnitures/delete',
  async ({roomId, furId}, thunk) => {
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
              url: `/rooms/${roomId}/furniture/${furId}`,
              method: 'delete'
            });
            const isSuccess = res.code === 200;

            if (isSuccess) {
              swal.fire('Deleted!', 'Nội thất đã được xóa!', 'success').then(d => thunk.dispatch(getRooms()));
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
