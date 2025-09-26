/** @jsxImportSource @emotion/react */
/**
 * ProtectedRoute.jsx (React Router v6)
 *
 * Purpose:
 *   Client-side guard that renders children only when a user is authenticated.
 *
 * Notes:
 *   - This is a UI convenience, not security. Always enforce auth/authorization
 *     on the server (e.g., check req.isAuthenticated / req.user).
 *   - Designed for v6 usage where routes pass components via the `element` prop.
 *
 * Usage:
 *   <Route
 *     path="/envelope"
 *     element={
 *       <ProtectedRoute>
 *         <Envelopes />
 *       </ProtectedRoute>
 *     }
 *   />
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, redirectTo = '/login' }) {
  const user = useSelector((store) => store.user);

  // Render protected content when authenticated; otherwise, redirect.
  return user?.id ? children : <Navigate to={redirectTo} replace />;
}

export default ProtectedRoute;
