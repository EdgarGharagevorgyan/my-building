import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: [],
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setServices: (state, action) => {
      state.services = action.payload;
    },
    addService: (state, action) => {
      state.services.push(action.payload);
    },
    updateService: (state, action) => {
      const index = state.services.findIndex((service) => service.id === action.payload.id);
      if (index !== -1) {
        state.services[index] = action.payload;
      }
    },
    deleteService: (state, action) => {
      state.services = state.services.filter((service) => service.id !== action.payload);
    },
  },
});

export const { setServices, addService, updateService, deleteService } = servicesSlice.actions;

export default servicesSlice.reducer;
