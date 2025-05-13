import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Family } from "../../components/types";
import { mockFamilies } from "../../devData/mockData";

interface FamiliesState {
  families: Family[];
}

const initialState: FamiliesState = {
  families: mockFamilies,
};

const familiesSlice = createSlice({
  name: "families",
  initialState,
  reducers: {
    addFamily: (state, action: PayloadAction<Family>) => {
      state.families.push(action.payload);
    },
    updateFamily: (state, action: PayloadAction<Family>) => {
      const index = state.families.findIndex((family) => family.id === action.payload.id);
      if (index !== -1) {
        state.families[index] = action.payload;
      }
    },
    deleteFamily: (state, action: PayloadAction<string>) => {
      state.families = state.families.filter((family) => family.id !== action.payload);
    },
    setFamilies: (state, action: PayloadAction<Family[]>) => {
      state.families = action.payload;
    },
  },
});

export const { addFamily, updateFamily, deleteFamily, setFamilies } = familiesSlice.actions;

export default familiesSlice.reducer;
