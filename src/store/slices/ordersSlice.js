import { createSlice, isFulfilled } from '@reduxjs/toolkit';
import { isPendingAction } from '../../utils/helper';

// Slice
export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    menu: {},
    listMenu: [],
    success: false,
    loading: true
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isPendingAction('orders/get'), (state, action) => {
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

export default ordersSlice.reducer;
