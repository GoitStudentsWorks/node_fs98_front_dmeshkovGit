import { createSlice } from '@reduxjs/toolkit';
import { addWater, getDayWater, deleteWater, editWater } from './operations';
import { logout } from '../user/operations';

const slice = createSlice({
  name: 'water',
  initialState: {
    activeDay: '',
    dayWater: { date: '', water: [] },
    currentDay: [],
    loading: false,
  },
  reducers: {
    setActiveDay: (state, action) => {
      state.activeDay = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(addWater.pending, state => {
        state.loading = true;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.loading = false;

        const date = new Date(action.payload.date);
        date.setUTCHours(0, 0, 0, 0);
        const requestDate = date.toISOString();

        state.dayWater.date = state.activeDay;

        if (state.dayWater.date === requestDate) {
          state.dayWater.water.push(action.payload);
        }

        const currentDate = new Date();
        currentDate.setUTCHours(0, 0, 0, 0);
        const currentDay = currentDate.toISOString();

        if (currentDay === requestDate) {
          state.currentDay.push(action.payload);
        }
      })
      .addCase(addWater.rejected, state => {
        state.loading = false;
      })
      .addCase(getDayWater.pending, state => {
        state.loading = true;
      })
      .addCase(getDayWater.fulfilled, (state, action) => {
        state.loading = false;
        state.dayWater.water = action.payload.flat();

        if (action.payload.length > 0) {
          const date = new Date(action.payload[0].date);
          date.setUTCHours(0, 0, 0, 0);
          const requestDate = date.toISOString();

          const currentDate = new Date();
          currentDate.setUTCHours(0, 0, 0, 0);
          const currentDay = currentDate.toISOString();

          if (currentDay === requestDate) {
            state.currentDay = action.payload.flat();
          }
        }
      })
      .addCase(getDayWater.rejected, state => {
        state.loading = false;
        state.dayWater.water = [];
      })
      .addCase(deleteWater.pending, state => {
        state.loading = true;
      })
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.loading = false;
        state.dayWater.water = state.dayWater.water.filter(
          item => item._id !== action.payload._id,
        );
        state.currentDay = state.currentDay.filter(
          item => item._id !== action.payload._id,
        );
      })
      .addCase(deleteWater.rejected, state => {
        state.loading = false;
      })
      .addCase(editWater.pending, state => {
        state.loading = true;
      })
      .addCase(editWater.fulfilled, (state, action) => {
        state.loading = false;
        state.dayWater.water = state.dayWater.water.map(item =>
          item._id === action.payload._id ? action.payload : item,
        );
        state.currentDay = state.currentDay.map(item =>
          item._id === action.payload._id ? action.payload : item,
        );
      })
      .addCase(editWater.rejected, state => {
        state.loading = false;
      })
      .addCase(logout.fulfilled, state => {
        state.dayWater.water = [];
        state.currentDay = [];
      }),
});

export default slice.reducer;
export const { setActiveDay } = slice.actions;
