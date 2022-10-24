import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { City } from '../../types/city';

interface Location {
  latitude: string;
  longitude: string;
  region: string;
  country: string;
}

interface Locations {
  data: Location[];
}

interface InitialState {
  loading: boolean;
  coordinates: Location[] | null;
  error: string;
}

const initialState: InitialState = {
  loading: false,
  coordinates: null,
  error: '',
};

export const fetchCoordinates = createAsyncThunk('coordinate/fetchCoordinates', async (city: City) => {
  try {
    const response = await fetch(`/.netlify/functions/fetch-coordinates?cityName=${city.nom}&region=${city.departement.nom}`);
    return response.json();
  } catch (error) {
    return error;
  }
});

const coordinateSlice = createSlice({
  name: 'coordinate',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCoordinates.pending, state => {
      state.loading = true;
    });

    builder.addCase(fetchCoordinates.fulfilled, (state, action: PayloadAction<Locations>) => {
      state.loading = false;
      state.coordinates = action.payload.data;
      state.error = '';
    });

    builder.addCase(fetchCoordinates.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'An error occured';
    });
  },
});

export default coordinateSlice.reducer;
