import API from 'src/api';
import { roomsSlice } from '../slices/roomsSlice';
import swal from 'sweetalert2';
import { push } from 'connected-react-router';
import RoutesString from 'src/routes/routesString';
import { createAsyncThunk } from '@reduxjs/toolkit';
export const getRooms = createAsyncThunk('rooms/get', async () => {
  const response = await API({
    url: '/rooms',
    method: 'GET'
  });
  const data = {
    rooms: response?.data || [],
    success: false
  };
  return data;
});
export const getRoomTypes = createAsyncThunk('rooms/getRoomTypes', async () => {
  const response = await API({
    url: '/room-types',
    method: 'GET'
  });
  const data = {
    roomTypes: response?.data || [],
    success: false
  };
  return data;
});
export const createRoom = createAsyncThunk(
  'rooms/create',
  async (values, thunk) => {
    try {
      const res = await API({
        url: '/rooms',
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
              thunk.dispatch(push(RoutesString.Rooms));
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

export const updateRoom = createAsyncThunk(
  'rooms/update',
  async (values, thunk) => {
    try {
      const res = await API({
        url: `/rooms/${values._id}`,
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
              thunk.dispatch(push(RoutesString.Rooms));
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

export const deleteRoom = createAsyncThunk('rooms/delete', async (id) => {
  try {
    return swal
      .fire({
        title: 'Xóa phòng',
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
            url: `/rooms/${id}`,
            method: 'delete'
          });
          const isSuccess = res.code === 200;

          if (isSuccess) {
            swal.fire('Deleted!', 'Phòng đã được xóa!', 'success');
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

export const createTypeRoom = createAsyncThunk(
  'rooms-types/create',
  async (values, thunk) => {
    try {
      const res = await API({
        url: '/room-types',
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
              thunk.dispatch(push(RoutesString.RoomType));
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

export const deleteTypeRoom = createAsyncThunk('room-types/delete', async (id) => {
  try {
    return swal
      .fire({
        title: 'Xóa',
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
            url: `/room-types/${id}`,
            method: 'delete'
          });
          const isSuccess = res.code === 200;

          if (isSuccess) {
            swal.fire('Deleted!', 'Đã được xóa!', 'success');
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

export const updateTypeRoom = createAsyncThunk(
  'room-types/update',
  async (values, thunk) => {
    try {
      const res = await API({
        url: `/room-types/${values._id}`,
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
              thunk.dispatch(push(RoutesString.RoomType));
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