import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalBuildings: 0,
  totalFamilies: 0,
  totalServices: 0,
  totalPartners: 0,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardData: (state, action) => {
      state.totalBuildings = action.payload.totalBuildings;
      state.totalFamilies = action.payload.totalFamilies;
      state.totalServices = action.payload.totalServices;
      state.totalPartners = action.payload.totalPartners;
    },
  },
});

export const { setDashboardData } = dashboardSlice.actions;

export default dashboardSlice.reducer;
