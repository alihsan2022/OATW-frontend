import { createSlice } from "@reduxjs/toolkit";

export const checkoutCartSlice = createSlice({
  name: "cart",
  initialState: {
    cartSponsorItems: [],
    totalCartItems: 0,
    cartDonation: 0,
    totalPrice: 0,
    stripeProductIds: {
      month: "price_1MQkWQCW3PBYUUmKCTP4qzbg",
      quarter: "price_1MQkWQCW3PBYUUmKuj1jbZCD",
      year: "price_1MQkWQCW3PBYUUmKPTVaQeCa",
      donation: "price_1MSzO1CW3PBYUUmKf4kgupqf",
    },
    donationItems: {
      purchaserId: "",
      productId: "",
      amount: 0,
      type: "donation",
    },
  },
  reducers: {
    incrementCart: (state) => {
      state.totalCartItems += 1;
    },
    decrementCart: (state) => {
      state.totalCartItems -= 1;
    },
    addDonation: (state, action) => {
      state.cartDonation += action.payload;
      state.totalPrice += action.payload;
    },
    removeFromCart: (state, action) => {
      const removeItem = state.cartSponsorItems.filter(
        (item) => item.orphanId !== action.payload
      );
      console.log(removeItem);
      state.cartSponsorItems = removeItem;
      if (state.totalCartItems === 0) state.totalCartItems = 0;
      if (state.totalCartItems >= 1) state.totalCartItems -= 1;
    },
    getTotalCost: (state) => {
      let total = 0;
      const totalOrphans = state.cartSponsorItems.map((orphan, index) => {
        total += orphan.price;
      });

      total += state.cartDonation;
      state.totalPrice = total;
    },
    addItemToCart: (state, action) => {
      state.cartSponsorItems.push({ ...action.payload });
    },
    addDonationItem: (state, action) => {
      state.donationItems = action.payload;
    },
    updateDonation: (state, action) => {
      if (state.donationItems.amount === 0) {
        state.donationItems.amount += action.payload;
        state.totalCartItems = state.totalCartItems + 1;
      } else {
        state.donationItems.amount += action.payload;
      }
    },
    removeDonation: (state, action) => {
      state.donationItems.amount = 0;
      state.totalCartItems -= 1;
    },
    updateDonationIds: (state, action) => {
      state.donationItems.productId = action.payload.productId;
      state.donationItems.purchaserId = action.payload.purchaserId;
    },
  },
});

export const {
  incrementCart,
  decrementCart,
  addDonation,
  removeFromCart,
  getTotalCost,
  addItemToCart,
  addDonationItem,
  updateDonation,
  removeDonation,
  updateDonationIds,
} = checkoutCartSlice.actions;

export default checkoutCartSlice.reducer;
