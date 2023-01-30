import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Homepage from "./Components/Homepage/Homepage";
import Sponsor from "./Pages/Sponsor/Sponsor";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import { AuthProvider } from "./Context/AuthProvider";
import Profile from "./Pages/Auth/Profile";
import Header from "./Components/Navbars/Header";
import Footer from "./Components/Navbars/Footer";
import AdminDashboard from "./Pages/Dashboards/AdminDashboard/AdminDashboard";
import UserDashboard from "./Pages/Dashboards/UserDashboard/UserDashboard";
import OrphanageDashboard from "./Pages/Dashboards/OrphanageDashboard/OrphanageDashboard";
import Dashboard from "./Pages/Dashboards/Dashboard";
import Orphan from "./Pages/Sponsor/Orphan";
import OrphanDetails from "./Pages/Sponsor/OrphanDetails";
import Cart from "./Components/Cart/Cart";
import OrphanSponsor from "./Pages/Sponsor/OrphanSponsor";
import Checkout from "./Components/Cart/Checkout";
import PaymentDetails from "./Pages/Payments/PaymentDetails";
import DetailsCollected from "./Pages/Payments/DetailsCollected";
import BillingDetails from "./Pages/Payments/BillingDetails";
import CustomerCollectionForm from "./Pages/CustomerPayments";
import Verification from "./Pages/Dashboards/UserDashboard/Verification";
import NoMatch from "./Pages/NoMatch/NoMatch";
import CardStatus from "./Pages/Dashboards/UserDashboard/CardStatus";
import FAQPage from "./Pages/FAQPage/FAQPage";
import PaymentStatus from "./Pages/Dashboards/UserDashboard/PaymentStatus";
import store from "./Redux/store";
import { Provider } from "react-redux";
import ScrollToTop from "./Components/ScrollToTop";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import ContactUs from "./Pages/Auth/ContactForm/ContactUs";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <NotificationContainer />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/sponsor" element={<Sponsor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/BankVerification" element={<Verification />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orphan-details" element={<OrphanDetails />} />
          <Route path="/orphan-sponsor" element={<OrphanSponsor />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/collectDetails" element={<PaymentDetails />} />
          <Route path="/accountCompletion" element={<DetailsCollected />} />
          <Route path="/billingDetails" element={<BillingDetails />} />
          <Route path="/customer" element={<CustomerCollectionForm />} />
          <Route path="*" element={<NoMatch />} />
          <Route path="/error" element={<NoMatch />} />
          <Route path="/verificationStatus" element={<CardStatus />} />
          <Route path="/FAQPage" element={<FAQPage />} />
          <Route path="/paymentStatus" element={<PaymentStatus />} />
          <Route path="/contactUs" element={<ContactUs />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
