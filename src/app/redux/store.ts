import { configureStore } from '@reduxjs/toolkit';
import gmailReducer from '../../features/gmail/gmailSlice';

const store = configureStore({
  reducer: {
    gmail: gmailReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
