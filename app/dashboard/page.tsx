import React, { Key, useState } from "react";

import HomePage from "./pages/home";
import AppointmentPage from "./pages/appointments";
import ProfilePage from "./pages/profile";
import CustomNavigationBarComponent from "./steps.component";

export default function Dashboard() {
  const pages: any = {
    home: <HomePage />,
    appointments: <AppointmentPage />,
    profile: <ProfilePage />,
  };
  return (
    <div className="flex flex-col h-full">
      <CustomNavigationBarComponent defaultKey="home" pages={pages} />
    </div>
  );
}
