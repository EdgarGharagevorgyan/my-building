import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../../components/Layout/MainLayout";

import DashboardPage from "../../pages/DashboardPage";
import BuildingsPage from "../../pages/BuildingsPage";
import FamiliesPage from "../../pages/FamiliesPage";
import PartnersPage from "../../pages/PartnersPage";
import ServicesPage from "../../pages/ServicesPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="buildings" element={<BuildingsPage />} />
        <Route path="families" element={<FamiliesPage />} />
        <Route path="partners" element={<PartnersPage />} />
        <Route path="services" element={<ServicesPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
