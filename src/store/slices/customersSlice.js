import { createSlice, isFulfilled } from '@reduxjs/toolkit';
import { isPendingAction } from '../../utils/helper';

// Slice
export const customersSlice = createSlice({
  name: 'customers',
  initialState: {
    customers: [],
    success: false,
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isPendingAction('customers/get'), (state, action) => {
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

export default customersSlice.reducer;
