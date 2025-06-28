import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  bottomTab: true,
};

const ComSlice = createSlice({
  name: 'commen',
  initialState,
  reducers: {
    setTab: (state, action) => {
      state.bottomTab = action.payload;
    },
  },
});

export const {setTab} = ComSlice.actions;

export default ComSlice.reducer;
