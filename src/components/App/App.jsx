import React, { useEffect, useState } from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import AdminDashboard from "../Admin/AdminDashboard/AdminDashboard";
import AdminProtectedRoute from "../AdminProtectedRoute/AdminProtectedRoute";
import NewTransaction from "../NewTransaction/NewTransaction.jsx";
import Envelopes from "../Envelopes/Envelopes";
import AdminBudget from "../Admin/AdminBudget/AdminBudget.jsx";
import AdminUsers from "../Admin/AdminUsers/AdminUsers.jsx";
import AdminChecks from "../Admin/AdminChecks/AdminCheck.jsx";
import AdminEnvelopes from "../Admin/AdminEnvelopes/AdminEnvelopes.jsx";
import AdminTransactions from "../Admin/AdminTransactions/AdminTransactions.jsx";

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
          <Redirect exact from="/" to="/home" />

          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /home page
              <Redirect to="/home" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /home page
              <Redirect to="/home" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /landing page
              <LandingPage />
            ) : (
              // Otherwise, show the Login page
              <LoginPage />
            )}
          </Route>

          <AdminProtectedRoute
            // shows Admin
            path="/admin"
          >
            <AdminDashboard />
          </AdminProtectedRoute>

          <AdminProtectedRoute 
            path="/admin-users"
          >
            <AdminDashboard />
            <AdminUsers />
          </AdminProtectedRoute>

          <AdminProtectedRoute 
            path="/admin-budget"
          >
            <AdminDashboard />
            <AdminBudget />
          </AdminProtectedRoute>

          <AdminProtectedRoute 
            path="/admin-checks"
          >
            <AdminDashboard />
            <AdminChecks />
          </AdminProtectedRoute>

          <AdminProtectedRoute 
            path="/admin-envelopes"
          >
            <AdminDashboard />
            <AdminEnvelopes />
          </AdminProtectedRoute>

          <AdminProtectedRoute 
            path="/admin-transactions"
          >
            <AdminDashboard />
            <AdminTransactions />
          </AdminProtectedRoute>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/home will show the landing page if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/home */}

          <ProtectedRoute path="/envelope">
            <Envelopes />
          </ProtectedRoute>

          <ProtectedRoute path="/new-transaction">
            <NewTransaction />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
