import { createSlice, isFulfilled } from '@reduxjs/toolkit';
import { isPendingAction } from '../../utils/helper';

// Slice
export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    value: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isFulfilled, (state, action) => {
      Object.keys(action?.payload || {}).forEach((key) => {
        state[key] = action.payload[key];
      });
    });
  }
});

export default modalSlice.reducer;
