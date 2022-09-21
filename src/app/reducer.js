import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  token: null,
  startedTests: [],
};

const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      return { ...state, ...payload };
    },
    resetUser(state) {
      return { ...state, ...initialState };
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice;
