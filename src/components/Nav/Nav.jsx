import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Prime Solo Project</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            {/* <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link> */}

            <LogOutButton className="navLink" />
          </>
        )}

        {/* <Link className="navLink" to="/about">
          About
        </Link> */}

        <Link className="navAdminDash navLink" to="/admin-dashboard">
         Admin Dashboard 
        </Link>

        <Link className="navFormPartOne navLink" to="/form-part-one">
         Form Part One 
        </Link>

        <Link className="navFormPartTwo navLink" to="/form-part-two">
         Form Part Two 
        </Link>

        <Link className="navFormReview navLink" to="/form-review">
         Form Review
        </Link>


        <Link className="navFormPartThree navLink" to="/form-part-three">
         Form Part Three
        </Link>
      </div>
    </div>
  );
}

export default Nav;
