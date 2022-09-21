import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  token: null,
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
    // addAnswer(state, { payload }) {
    //   // return { ...state, ...initialState };
    //   if (state.answers.some(item => item.questionId === payload.questionId)) {
    //     state.answers.forEach((item, index, array) => {
    //       if (item.questionId === payload.questionId) {
    //         array[index].answer = payload.answer;
    //       }
    //     });
    //   } else {
    //     state.answers.push(payload);
    //   }
    // },
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice;
