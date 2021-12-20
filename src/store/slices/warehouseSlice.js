import { createSlice, isFulfilled } from '@reduxjs/toolkit';
import { isPendingAction } from '../../utils/helper';

// Slice
export const warehouseSlice = createSlice({
  name: 'warehouse',
  initialState: {
    stock: [],
    success: false,
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isPendingAction('warehouse/get'), (state, action) => {
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

export default warehouseSlice.reducer;
