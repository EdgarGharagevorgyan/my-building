import { createSlice } from "@reduxjs/toolkit";
import { mockBuildings } from "../../devData/mockData";

const initialState = {
  buildings: mockBuildings,
};

const buildingsSlice = createSlice({
  name: "buildings",
  initialState,
  reducers: {
    addBuilding: (state, action) => {
      state.buildings.push(action.payload);
    },
    updateBuilding: (state, action) => {
      const index = state.buildings.findIndex((building) => building.id === action.payload.id);
      if (index !== -1) {
        state.buildings[index] = action.payload;
      }
    },
    deleteBuilding: (state, action) => {
      state.buildings = state.buildings.filter((building) => building.id !== action.payload);
    },
  },
});

export const { addBuilding, updateBuilding, deleteBuilding } = buildingsSlice.actions;

export default buildingsSlice.reducer;
