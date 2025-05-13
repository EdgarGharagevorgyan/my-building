import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Partner, PartnersState } from "../../components/types";
import { mockPartners } from "../../devData/mockData";

const initialState: PartnersState = {
  partners: mockPartners,
};

const partnersSlice = createSlice({
  name: "partners",
  initialState,
  reducers: {
    setPartners: (state, action: PayloadAction<Partner[]>) => {
      state.partners = action.payload;
    },
    addPartner: (state, action: PayloadAction<Partner>) => {
      state.partners.push(action.payload);
    },
    updatePartner: (state, action: PayloadAction<Partner>) => {
      const index = state.partners.findIndex((partner) => partner.id === action.payload.id);
      if (index !== -1) {
        state.partners[index] = action.payload;
      }
    },
    deletePartner: (state, action: PayloadAction<string>) => {
      state.partners = state.partners.filter((partner) => partner.id !== action.payload);
    },
  },
});

export const { setPartners, addPartner, updatePartner, deletePartner } = partnersSlice.actions;

export default partnersSlice.reducer;
