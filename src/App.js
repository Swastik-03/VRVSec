import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";
import PermissionMatrix from "./components/PermissionMatrix";
import PermissionManagement from "./components/PermissionManagement";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <header className="bg-white text-gray-800 shadow-md">
        <NavBar />
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route path="/" element={<UserManagement />} />
          <Route path="/roles" element={<RoleManagement />} />
          <Route path="/permissions" element={<PermissionManagement />} />
          <Route path="/permissionsMatrix" element={<PermissionMatrix />} />
        </Routes>
      </main>

    </Router>
  );
}

export default App;

