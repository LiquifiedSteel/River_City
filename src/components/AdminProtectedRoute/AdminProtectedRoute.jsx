/**
 * AdminProtectedRoute.jsx (React Router v6)
 *
 * Purpose:
 *   Client-side guard that only allows admins to view protected content.
 *
 * Notes:
 *   - This is only a UI-level restriction. Real security must be enforced
 *     on the server (e.g., check req.user.isAdmin).
 *   - Designed for use with v6 where routes pass components via `element`.
 *
 * Usage:
 *   <Route
 *     path="/admin-users"
 *     element={
 *       <AdminProtectedRoute>
 *         <AdminUsers />
 *       </AdminProtectedRoute>
 *     }
 *   />
 */

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function AdminProtectedRoute({ children, redirectTo = '/home' }) {
  const user = useSelector((store) => store.user);

  // Only allow admins to access children; otherwise redirect.
  return user?.isAdmin ? children : <Navigate to={redirectTo} replace />;
}

export default AdminProtectedRoute;