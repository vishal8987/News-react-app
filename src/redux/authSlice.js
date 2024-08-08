import { createSlice } from '@reduxjs/toolkit';

const getInitialUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getInitialUser(),
    status: 'idle',
    error: null,
  },
  reducers: {
    signUpStart(state) {
      state.status = 'loading';
    },
    signInStart: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload; // Save user information in the state
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.error = null;
    },
    signUpSuccess(state, action) {
      state.status = 'succeeded';
      state.user = action.payload;
      state.error = null;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    signUpFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    signInFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload; // Save error message in the state
    },
    signOut(state) {
      state.user = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('user');
    },
  },
});

export const { signUpStart, signUpSuccess,signInSuccess,signInStart ,signUpFailure, signOut ,signInFailure} = authSlice.actions;
export default authSlice.reducer;
