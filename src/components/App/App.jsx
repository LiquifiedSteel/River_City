import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AdminProtectedRoute from "../AdminProtectedRoute/AdminProtectedRoute";

import LandingPage from "../LandingPage/LandingPage.jsx";
import LoginPage from "../LoginPage/LoginPage.jsx";
import RegisterPage from "../RegisterPage/RegisterPage.jsx";
import AdminDashboard from "../Admin/AdminDashboard/AdminDashboard.jsx";
import NewTransaction from "../NewTransaction/NewTransaction.jsx";
import Envelopes from "../Envelopes/Envelopes.jsx";
import AdminBudget from "../Admin/AdminBudget/AdminBudget.jsx";
import AdminUsers from "../Admin/AdminUsers/AdminUsers.jsx";
import AdminChecks from "../Admin/AdminChecks/AdminCheck.jsx";
import AdminEnvelopes from "../Admin/AdminEnvelopes/AdminEnvelopes.jsx";
import AdminTransactions from "../Admin/AdminTransactions/AdminTransactions.jsx";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          {/* Redirect root to /home */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Login */}
          <Route
            path="/login"
            element={user.id ? <Navigate to="/home" replace /> : <LoginPage />}
          />

          {/* Registration */}
          <Route
            path="/registration"
            element={
              user.id ? <Navigate to="/home" replace /> : <RegisterPage />
            }
          />

          {/* Home/Landing */}
          <Route
            path="/home"
            element={user.id ? <LandingPage /> : <LoginPage />}
          />

          {/* Admin Routes */}
          <Route
            path="/admin-users"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
                <AdminUsers />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-budget"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
                <AdminBudget />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-checks"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
                <AdminChecks />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-envelopes"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
                <AdminEnvelopes />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin-transactions"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
                <AdminTransactions />
              </AdminProtectedRoute>
            }
          />

          {/* Protected User Routes */}
          <Route
            path="/envelope"
            element={
              <ProtectedRoute>
                <Envelopes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-transaction"
            element={
              <ProtectedRoute>
                <NewTransaction />
              </ProtectedRoute>
            }
          />

          {/* 404 Page */}
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
