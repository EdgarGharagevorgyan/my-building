import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "../../features/dashboard/dashboardSlice";
import buildingsReducer from "../../features/buildings/buildingsSlice";
import familiesReducer from "../../features/families/familiesSlice";
import servicesReducer from "../../features/services/servicesSlice";
import partnersReducer from "../../features/partners/partnersSlice";

<<<<<<< HEAD

=======
export interface RootState {
  dashboard: ReturnType<typeof dashboardReducer>;
  buildings: ReturnType<typeof buildingsReducer>;
  families: ReturnType<typeof familiesReducer>;
  services: ReturnType<typeof servicesReducer>;
  partners: ReturnType<typeof partnersReducer>;
}
>>>>>>> f6195a07d69f6fcd4605a678b0adc8916db358ec

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    buildings: buildingsReducer,
    families: familiesReducer,
    services: servicesReducer,
    partners: partnersReducer,
  },
});

<<<<<<< HEAD
export type RootState = ReturnType<typeof store.getState>;

=======
>>>>>>> f6195a07d69f6fcd4605a678b0adc8916db358ec
export type AppDispatch = typeof store.dispatch;

export default store;