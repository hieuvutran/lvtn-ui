import { createAsyncThunk } from '@reduxjs/toolkit';

export const openModal = createAsyncThunk('modal/openModal', async (data) => {
  return data;
});
