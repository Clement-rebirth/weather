import { createSlice } from '@reduxjs/toolkit';

interface Coordinates {
  lat: string;
  long: string;
}

interface InitialState {
  loading: boolean;
  coordinates: Coordinates | null;
  error: string;
}

const initialState: InitialState = {
  loading: true,
  coordinates: null,
  error: '',
};

const coordinateSlice = createSlice({
  name: 'coordinate',
  initialState,
  reducers: {},
});

export default coordinateSlice.reducer;
