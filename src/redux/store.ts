import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './features/ui/uiSlice';
import postcodeReducer from './features/postcode/postcodeSlice';
import contactReducer from './features/contact/contactSlice';
import comparisonReducer from './features/comparison/comparisonSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      ui: uiReducer,
      postcode: postcodeReducer,
      contact: contactReducer,
      comparison: comparisonReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
