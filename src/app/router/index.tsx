import { Routes, Route } from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout";

import DashboardPage from "../../pages/DashboardPage";
import BuildingsPage from "../../pages/BuildingsPage";
import FamiliesPage from "../../pages/FamiliesPage";
import PartnersPage from "../../pages/PartnersPage";
import ServicesPage from "../../pages/ServicesPage";
import BuildingDetailsPage from "../../pages/BuildingDetailsPage";
import FamilyDetailsPage from "../../pages/FamilyDetailsPage";
import ServiceDetailsPage from "../../pages/ServiceDetailsPage";
import PartnerDetailsPage from "../../pages/PartnerDetailsPage";
import CountriesPage from "../../pages/CountriesPage";

const AppRouter: React.FC = () => {
  // Add the type for function component
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="buildings" element={<BuildingsPage />} />
        <Route path="buildings/:id" element={<BuildingDetailsPage />} />
        <Route path="families" element={<FamiliesPage />} />
        <Route path="families/:id" element={<FamilyDetailsPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:id" element={<ServiceDetailsPage />} />
        <Route path="partners" element={<PartnersPage />} />
        <Route path="partners/:id" element={<PartnerDetailsPage />} />
        <Route path="countries" element={<CountriesPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
