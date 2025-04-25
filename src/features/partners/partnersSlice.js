import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  partners: [],
};

const partnersSlice = createSlice({
  name: "partners",
  initialState,
  reducers: {
    setPartners: (state, action) => {
      state.partners = action.payload;
    },
    addPartner: (state, action) => {
      state.partners.push(action.payload);
    },
    updatePartner: (state, action) => {
      const index = state.partners.findIndex((partner) => partner.id === action.payload.id);
      if (index !== -1) {
        state.partners[index] = action.payload;
      }
    },
    deletePartner: (state, action) => {
      state.partners = state.partners.filter((partner) => partner.id !== action.payload);
    },
  },
});

export const { setPartners, addPartner, updatePartner, deletePartner } = partnersSlice.actions;

export default partnersSlice.reducer;
