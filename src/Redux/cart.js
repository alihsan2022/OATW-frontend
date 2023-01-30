import { createSlice } from "@reduxjs/toolkit";

export const checkoutCartSlice = createSlice({
  name: "cart",
  initialState: {
    cartSponsorItems: [
      {
        orphanId: "TO2iTdC4khsdZ7QEsdO",
        orphanageName: "Turkey",
        userId: "dsf2313213",
        price: 100,
        itemId: "12312sdfsdfsd",
        subscriptionDuration: "monthly",
      },
      {
        orphanId: "TO2iTdC4khZ7QEO",
        orphanageName: "Turkey",
        userId: "dsf2313213",
        price: 123,
        itemId: "12312sdfsdfsd",
        subscriptionDuration: "monthly",
      },
    ],
    totalCartItems: 2,
    cartDonation: 12,
    totalPrice: 0,
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
  },
});

export const {
  incrementCart,
  decrementCart,
  addDonation,
  removeFromCart,
  getTotalCost,
} = checkoutCartSlice.actions;

export default checkoutCartSlice.reducer;
