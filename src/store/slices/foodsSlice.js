import { createSlice, isFulfilled } from '@reduxjs/toolkit';
import { isPendingAction } from '../../utils/helper';

// Slice
export const foodsSlice = createSlice({
  name: 'foods',
  initialState: {
    foods: [],
    menu: {},
    listMenu: [],
    success: false,
    loading: true
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isPendingAction('foods/get'), (state, action) => {
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

export default foodsSlice.reducer;
