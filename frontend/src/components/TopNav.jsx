import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
// import {useNavigate} from "react-router-dom";
// import { useEffect } from "react";

const TopNav = ({ handleSidebar }) => {
  const userState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigate("/login");
  //     dispatch(logout());
  //     localStorage.removeItem("reduxState");
  //   }, 900000);
  // }, []);

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const userName = capitalize(
    " " + userState.user.firstName + " " + userState.user.lastName + " "
  );
  return (
    <>
      <nav className="navbar navbar-expand navbar-light navbar-bg">
        <a className="sidebar-toggle js-sidebar-toggle" onClick={handleSidebar}>
          <i className="hamburger align-self-center" />
        </a>
        <div className="navbar-collapse collapse">
          <ul className="navbar-nav navbar-align">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-sm-inline-block"
                data-bs-toggle="dropdown"
              >
                <span className="text-dark capitalize">
                  {userState.user.profilePic ? (
                    <img
                      src={userState.user.profilePic}
                      className="smallProfilePic"
                    />
                  ) : (
                    <span className="material-icons-round align-middle">
                      person
                    </span>
                  )}

                  {userName}
                </span>
              </a>
              <div className="dropdown-menu dropdown-menu-end">
                <Link className="dropdown-item" to="/profile">
                  <span className="material-icons vlb">person_outline</span>
                  Profile
                </Link>
                <div className="dropdown-divider" />
                <Link
                  className="dropdown-item"
                  to="/login"
                  onClick={() => {
                    dispatch(logout());
                    localStorage.removeItem("reduxState");
                  }}
                >
                  <span className="material-icons vlb">logout</span>
                  Logout
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

TopNav.propTypes = {
  handleSidebar: PropTypes.func,
};
export default TopNav;
