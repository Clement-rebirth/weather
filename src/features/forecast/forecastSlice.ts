import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Forecast {
  dt: number;
  main: object;
  weather: object[];
  clouds: number;
  wind: object;
  visibility: number;
  pop: number;
  sys: object;
  dt_txt: string;
}

interface Forecasts {
  cod: string;
  message: number;
  cnt: number;
  list: Forecast[];
  city: object;
}

interface InitialState {
  loading: boolean;
  forecasts: Forecasts | null;
  error: string;
}

interface FetchForecastsParams {
  lat: string;
  long: string;
  lang: string;
}

const initialState: InitialState = {
  loading: true,
  forecasts: null,
  error: '',
};

export const fetchForecasts = createAsyncThunk('forecast/fetchForecasts', async ({ lat, long, lang }: FetchForecastsParams) => {
  try {
    const response = await fetch(`/.netlify/functions/fetch-weather?lat=${lat}&long=${long}&lang=${lang}`);
    return response.json();
  } catch (error) {
    return error;
  }
});

const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchForecasts.pending, state => {
      state.loading = true;
    });

    builder.addCase(fetchForecasts.fulfilled, (state, action: PayloadAction<Forecasts>) => {
      state.loading = false;
      state.forecasts = action.payload;
      state.error = '';
    });

    builder.addCase(fetchForecasts.rejected, (state, action) => {
      state.loading = false;
      state.forecasts = null;
      state.error = action.error.message || 'An error occured';
    });
  },
});

export default forecastSlice.reducer;
