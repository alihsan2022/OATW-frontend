import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import userAuthReducer from "./userAuth";
import { applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

export default configureStore({
  reducer: {
    counter: counterReducer,
    userAuth: userAuthReducer,
  },
  middleware: [thunk],
});
