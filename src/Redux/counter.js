import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
    isUserVerified: false,
    user: null,
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;
    },
    verifyUser: (state, action) => {
      state.isUserVerified = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, verifyUser } =
  counterSlice.actions;

export default counterSlice.reducer;
