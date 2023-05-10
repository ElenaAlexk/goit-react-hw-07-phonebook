import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter: (state, action) => {
      return action.payload; //значення фільтра//
    },
  },
});

export const { setFilter } = filterSlice.actions;
export const filterReduser = filterSlice.reducer;
