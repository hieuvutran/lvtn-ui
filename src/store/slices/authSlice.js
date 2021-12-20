import { createSlice, isFulfilled } from '@reduxjs/toolkit';
import { isPendingAction } from '../../utils/helper';

// Slice
export const authsSlice = createSlice({
  name: 'auth',
  initialState: {
    success: false,
    loading: false,
    isLoggedIn: false,
    user: {
      accId: '',
      type: '',
      role: '',
      username: ''
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isPendingAction('auth/post'), (state, action) => {
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

export default authsSlice.reducer;
