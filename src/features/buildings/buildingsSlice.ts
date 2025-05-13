import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Building } from "../../components/types";
import { mockBuildings } from "../../devData/mockData";

interface BuildingsState {
  buildings: Building[];
}

const initialState: BuildingsState = {
  buildings: mockBuildings,
};

const buildingsSlice = createSlice({
  name: "buildings",
  initialState,
  reducers: {
    addBuilding: (state, action: PayloadAction<Building>) => {
      state.buildings.push(action.payload);
    },
    updateBuilding: (state, action: PayloadAction<Building>) => {
      const index = state.buildings.findIndex((building) => building.id === action.payload.id);
      if (index !== -1) {
        state.buildings[index] = action.payload;
      }
    },
    deleteBuilding: (state, action: PayloadAction<string>) => {
      state.buildings = state.buildings.filter((building) => building.id !== action.payload);
    },
  },
});

export const { addBuilding, updateBuilding, deleteBuilding } = buildingsSlice.actions;

export default buildingsSlice.reducer;
