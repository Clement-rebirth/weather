import { configureStore } from '@reduxjs/toolkit';
import forecastReducer from '../features/forecast/forecastSlice';
import cityReducer from '../features/city/citySlice';
import coordinateReducer from '../features/coordinate/coordinateSlice';

const store = configureStore({
  reducer: {
    forecast: forecastReducer,
    city: cityReducer,
    coordinate: coordinateReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
