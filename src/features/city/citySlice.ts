import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City } from '../../types/city';

interface InitialState {
  loading: boolean;
  cities: City[] | null;
  error: string;
}

const initialState: InitialState = {
  loading: false,
  cities: null,
  error: '',
};

export const searchCityWithName = createAsyncThunk('city/searchCityWithName', async (cityName: string) => {
  try {
    const response = await fetch(`https://geo.api.gouv.fr/communes?nom=${cityName}&fields=departement&boost=population&limit=10`);
    return response.json();
  } catch (error) {
    return error;
  }
});

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(searchCityWithName.pending, state => {
      state.loading = true;
    });

    builder.addCase(searchCityWithName.fulfilled, (state, action: PayloadAction<City[]>) => {
      state.loading = false;
      state.cities = action.payload;
      state.error = '';
    });

    builder.addCase(searchCityWithName.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'An error occured';
    });
  },
});

export default citySlice.reducer;
