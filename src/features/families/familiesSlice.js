import { createSlice } from "@reduxjs/toolkit";
import { mockFamilies } from "../../devData/mockData";

const initialState = {
  families: mockFamilies,
};

const familiesSlice = createSlice({
  name: "families",
  initialState,
  reducers: {
    addFamily: (state, action) => {
      state.families.push(action.payload);
    },
    updateFamily: (state, action) => {
      const index = state.families.findIndex((family) => family.id === action.payload.id);
      if (index !== -1) {
        state.families[index] = action.payload;
      }
    },
    deleteFamily: (state, action) => {
      state.families = state.families.filter((family) => family.id !== action.payload);
    },
    setFamilies: (state, action) => {
      state.families = action.payload;
    },
  },
});

export const { addFamily, updateFamily, deleteFamily, setFamilies } = familiesSlice.actions;

export default familiesSlice.reducer;
