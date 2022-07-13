import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from "./reducers/authSlice";
import restaurantReducer from "./reducers/restaurant";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurant: restaurantReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
