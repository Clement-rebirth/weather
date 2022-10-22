import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../features/weather/weatherSlice';
import cityReducer from '../features/city/citySlice';
import coordinateReducer from '../features/coordinate/coordinateSlice';

const store = configureStore({
  reducer: {
    city: cityReducer,
    coordinate: coordinateReducer,
    weather: weatherReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
