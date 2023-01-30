import { createSlice } from "@reduxjs/toolkit";

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: {
    userData: null,
    userName: "",
    userIsVerified: false,
    stripeCustomerId: "",
    paymentMethods: [],
    profileMenu: 0,
    billingAddress: {},
    fullName: "",
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    login: (state, action) => {
      state.userData = action.payload;
    },
    logout: (state) => {
      state.userData = null;
      state.userIsVerified = false;
      state.stripeCustomerId = "";
      state.billingAddress = {};
      state.fullName = "";
    },
    setVerification: (state) => {
      state.userIsVerified = true;
    },
    setCustomerId: (state, action) => {
      state.stripeCustomerId = action.payload;
    },
    setPaymentMethods: (state, action) => {
      state.paymentMethods = action.payload;
    },
    setProfileMenu: (state, action) => {
      state.profileMenu = action.payload;
    },
    resetProfileMenu: (state, action) => {
      state.profileMenu = 0;
    },
    setBillingAddress: (state, action) => {
      state.billingAddress = action.payload;
    },
    setFullName: (state, action) => {
      state.fullName = action.payload;
    },
  },
});

export const {
  setUserData,
  login,
  logout,
  setVerification,
  setCustomerId,
  setProfileMenu,
  resetProfileMenu,
  setBillingAddress,
  setFullName,
} = userAuthSlice.actions;

export default userAuthSlice.reducer;
