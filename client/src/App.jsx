import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import UserLayout from "./Layout/UserLayout";
import Navbar from "./components/commonUi/Navbar";
import PublicLayouts from "./Layout/PublicLayouts";

import AdminLayout from "./Layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Error404 from "./components/commonUi/Error404";

import { Toaster } from "react-hot-toast";

import "./App.css";
import PropertyListing from "./pages/PropertyListing";
import BuyerDashboard from "./pages/BuyerDashboard";
import SellerLayout from "./Layout/SellerLayout";
import SellerDashboard from "./pages/SellerDashboard";
import AddProperty from "./components/seller/AddProperty";
import PropertyDetails from "./pages/PropertyDetails";

import UpdateProperty from "./components/seller/UpdateProperty";
import UpdateMe from "./components/seller/UpdateMe";
import Footer from "./components/home/Footer";
import NavbarMenu from "./components/commonUi/Nav1/NavbarMenu";
import Nav from "./components/commonUi/Nav1/Nav";
const App = () => {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        {/* <NavbarMenu /> */}
        <Nav />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/property-listing/:urltype"
            element={<PropertyListing />}
          />

          <Route path="/details/:id" element={<PropertyDetails />} />
          {/* <Route path="/property-listing/rent" element={<PropertyListing />} /> */}

          <Route path="/" element={<UserLayout />}>
            <Route path="buyer-dashboard" index element={<BuyerDashboard />} />
          </Route>
          <Route path="/" element={<SellerLayout />}>
            <Route
              path="seller-dashboard"
              index
              element={<SellerDashboard />}
            />
            <Route path="add-property" element={<AddProperty />} />
            <Route path="edit-property/:id" element={<UpdateProperty />} />
            <Route path="upadteMe/:id" element={<UpdateMe />} />
          </Route>

          <Route path="/dashboard" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/" element={<PublicLayouts />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>

          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
