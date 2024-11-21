import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import InfoPage from "../InfoPage/InfoPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import AdminDashboard from "../Admin/AdminDashboard/AdminDashboard";
import AdminDataView from "../Admin/AdminDataView/AdminDataView";
import AdminFormEditor from "../Admin/AdminFormEditor/AdminFormEditor";
import FormPartOne from "../Form/FormPartOne";
import FormPartTwo from "../Form/FormPartTwo";
import FormPartThree from "../Form/FormPartThree";
import FormReview from "../Form/FormReview";
import FormSubmissionSuccess from "../Form/FormSubmissionSuccess"
import AdminProtectedRoute from "../AdminProtectedRoute/AdminProtectedRoute";

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

          {/* Visiting localhost:5173/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /form-part-one page
              <Redirect to="/form-part-one" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /form-part-one page
              <Redirect to="/form-part-one" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /form-part-one page
              <Redirect to="/form-part-one" />
            ) : (
              // Otherwise, show the Landing page
              <LandingPage />
            )}
          </Route>

          <AdminProtectedRoute
              // shows AdminDashboard
              exact
              path="/admin-dashboard"
            >
              <AdminDashboard />
          </AdminProtectedRoute>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/form-part-one will show the first form page if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
          
          <ProtectedRoute exact path="/form-part-one">
            <FormPartOne />
          </ProtectedRoute>

          <ProtectedRoute exact path="/form-part-two">
            <FormPartTwo />
          </ProtectedRoute>

          <ProtectedRoute exact path="/form-part-three">
            <FormPartThree />
          </ProtectedRoute>

          <ProtectedRoute exact path="/form-review">
            <FormReview />
          </ProtectedRoute>

          <ProtectedRoute exact path="/submission-success">
            <FormSubmissionSuccess />
          </ProtectedRoute>

          <AdminProtectedRoute exact path="/admin-data-view">
            <AdminDataView />
          </AdminProtectedRoute>

          <AdminProtectedRoute exact path="/admin-form-editor">
            <AdminFormEditor />
          </AdminProtectedRoute>

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
