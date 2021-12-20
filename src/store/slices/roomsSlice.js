import { createSlice, isFulfilled } from '@reduxjs/toolkit';
import { isPendingAction } from '../../utils/helper';

// Slice
export const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [],
    success: false,
    loading: false,
    roomTypes: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isPendingAction('rooms/get'), (state, action) => {
      state.loading = true;
    }),
      builder.addMatcher(isFulfilled, (state, action) => {
        state.loading = false;
        Object.keys(action?.payload || {}).forEach((key) => {
          state[key] = action.payload[key];
        });
      });
  }
});

export default roomsSlice.reducer;
