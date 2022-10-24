import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Weather } from '../../types/weather';

interface FetchWeatherParams {
  lat: string;
  long: string;
  lang: string;
}

interface InitialState {
  loading: boolean;
  weather: Weather | null;
  error: string;
}

const initialState: InitialState = {
  loading: false,
  weather: null,
  error: '',
};

export const fetchWeather = createAsyncThunk('forecast/fetchWeather', async ({ lat, long, lang }: FetchWeatherParams) => {
  try {
    const response = await fetch(`/.netlify/functions/fetch-weather?lat=${lat}&long=${long}&lang=${lang}`);
    return response.json();
  } catch (error) {
    return error;
  }
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchWeather.pending, state => {
      state.loading = true;
    });

    builder.addCase(fetchWeather.fulfilled, (state, action: PayloadAction<Weather>) => {
      state.loading = false;
      state.weather = action.payload;
      state.error = '';
    });

    builder.addCase(fetchWeather.rejected, (state, action) => {
      state.loading = false;
      state.weather = null;
      state.error = action.error.message || 'An error occured';
    });
  },
});

export default weatherSlice.reducer;
