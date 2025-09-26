import React, { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import AdminRegister from "./AdminRegister.jsx";

/**
 * AdminUsers.jsx
 *
 * Purpose:
 *   Admin user management view: list users, toggle admin, create new user, delete user.
 *
 * Key behaviors:
 *   - Loads user list on mount/route change.
 *   - Ensures the "new user" form toggle is reset when arriving here.
 *   - Uses Redux store for users and the shared envSwitch toggle.
 *
 * Notes:
 *   - Avoids stale UI state by resetting the toggle on route changes (component may not unmount).
 *   - Replaces setState calls with Redux refresh after mutations.
 */

function AdminUsers() {
    const currentUser = useSelector((store) => store.user);
    const users = useSelector((store) => store.userList);
    const toggle = useSelector((store) => store.envSwitch);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        document.title = "Admin - Users";
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Always refresh users when we land on (or navigate within) this page
        dispatch({ type: "GRAB_USER_LIST" });

        // Important: reset the global toggle when entering this page so it doesn't “stick”
        // If you have an explicit "set" action, prefer it (e.g., { type: 'ENV_SWITCH_SET', payload: false }).
        dispatch({ type: "RESET" });
    }, [dispatch, location.pathname]); // run again on route change to keep UI consistent

  const toggleAdmin = async (user) => {
    if (!user.isAdmin) {
      if (confirm("Are you sure you want to make this user an Admin?")) {
        try {
          await axios.put(`/api/user/admin/${user.id}`);
          dispatch({ type: "GRAB_USER_LIST" }); // refresh Redux list
        } catch (err) {
          if (process.env.NODE_ENV !== "production") {
            console.error("Error changing user's admin status:", err);
          }
        }
      }
    } else {
      if (confirm("Are you sure you want to remove Admin from this user?")) {
        try {
          await axios.put(`/api/user/admin/${user.id}`);
          dispatch({ type: "GRAB_USER_LIST" }); // refresh Redux list
        } catch (err) {
          if (process.env.NODE_ENV !== "production") {
            console.error("Error changing user's admin status:", err);
          }
        }
      }
    }
  };

  const deleteUser = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/api/user/deleteUser/${id}`);
        // Do NOT call setUsers here; users are from Redux.
        // Instead, re-fetch the list to keep state consistent:
        dispatch({ type: "GRAB_USER_LIST" });
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.error("Error deleting user:", error);
        }
      }
    }
  };

  return (
    <Container fluid>
      {toggle.admin ? (
        <>
          {/* Render your RegisterForm via the existing component */}
          {/* If RegisterForm relies on the same toggle, it will close with the Cancel button */}
          <AdminRegister />
          <center>
            <button
              type="button"
              className="adminTableButton adminUserCancel"
              onClick={() => dispatch({ type: "RESET" })}
            >
              Cancel
            </button>
          </center>
        </>
      ) : (
        <button
          type="button"
          className="adminTableButton"
          onClick={() => dispatch({ type: "SWITCH_ADMIN" })}
        >
          + New User
        </button>
      )}

      <Table hover striped>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Is Admin</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {users
            .filter((user) => !user.deleted)
            .map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{String(user.isAdmin)}</td>

                <td>
                  {user.username !== currentUser.username && (
                    <button
                      type="button"
                      className="adminTableButton"
                      onClick={() => toggleAdmin(user)}
                    >
                      Toggle Admin
                    </button>
                  )}
                </td>

                <td>
                  {!user.isAdmin ? (
                    <button
                      type="button"
                      className="adminTableButton"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete User
                    </button>
                  ) : (
                    <></>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminUsers;