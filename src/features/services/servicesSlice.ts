import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Service, ServicesState } from "../../components/types";
import { mockServices } from "../../devData/mockData";

const initialState: ServicesState = {
  services: mockServices,
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<Service[]>) => {
      state.services = action.payload;
    },
    addService: (state, action: PayloadAction<Service>) => {
      state.services.push(action.payload);
    },
    updateService: (state, action: PayloadAction<Service>) => {
      const index = state.services.findIndex((service) => service.id === action.payload.id);
      if (index !== -1) {
        state.services[index] = action.payload;
      }
    },
    deleteService: (state, action: PayloadAction<string>) => {
      state.services = state.services.filter((service) => service.id !== action.payload);
    },
  },
});

export const { setServices, addService, updateService, deleteService } = servicesSlice.actions;

export default servicesSlice.reducer;
