import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "../../features/dashboard/dashboardSlice";
import buildingsReducer from "../../features/buildings/buildingsSlice";
import familiesReducer from "../../features/families/familiesSlice";
import servicesReducer from "../../features/services/servicesSlice";
import partnersReducer from "../../features/partners/partnersSlice";


export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    buildings: buildingsReducer,
    families: familiesReducer,
    services: servicesReducer,
    partners: partnersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;