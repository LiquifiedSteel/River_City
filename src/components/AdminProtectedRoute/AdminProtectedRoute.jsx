import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useSelector} from 'react-redux';


function AdminProtectedRoute({ component, children, ...props }) {
  const user = useSelector((store) => store.user);

  // Component may be passed in as a "component" prop,
  // or as a child component.
  const ProtectedComponent = component || (() => children);

  // We return a Route component that gets added to our list of routes
  return (
    <Route
      // all props like 'exact' and 'path' that were passed in
      // are now passed along to the 'Route' Component
      {...props}
    >
      {user.isAdmin ?
        // If the user is an Admin, show the protected component
        <ProtectedComponent />
        :
        // Otherwise, redirect to form-part-one
        <Redirect exact to="/form-part-one" />
      }
    </Route>

  );
}

export default AdminProtectedRoute;