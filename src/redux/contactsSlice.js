import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';
//import { nanoid } from 'nanoid';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const handleFetchSuccess = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.items = payload;
};

const handleAddContactSuccess = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.items.push(payload);
};

const handleDeleteContactSuccess = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.items = state.items.filter(item => item.id !== payload.id);
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    [fetchContacts.pending]: handlePending,
    [addContact.pending]: handlePending,
    [deleteContact.pending]: handlePending,
    [fetchContacts.rejected]: handleRejected,
    [addContact.rejected]: handleRejected,
    [deleteContact.rejected]: handleRejected,
    [fetchContacts.fulfilled]: handleFetchSuccess,
    [addContact.fulfilled]: handleAddContactSuccess,
    [deleteContact.fulfilled]: handleDeleteContactSuccess,
  },
});

export const contactsReducer = contactsSlice.reducer;
