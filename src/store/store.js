import { configureStore } from "@reduxjs/toolkit";
import { adminServiceApi } from "./services/admin";
import { productServiceApi } from "./services/products";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [adminServiceApi.reducerPath]: adminServiceApi.reducer,
    [productServiceApi.reducerPath]: productServiceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      adminServiceApi.middleware,
      productServiceApi.middleware,
    ),
});

export default store;