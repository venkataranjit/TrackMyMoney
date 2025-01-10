import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
const logo_w = "/logo-white.png";

const SideNav = ({ sidebarRef }) => {
  const dispatch = useDispatch();
  return (
    <>
      <nav id="sidebar" className="sidebar js-sidebar" ref={sidebarRef}>
        <div className="sidebar-content js-simplebar">
          <NavLink className="sidebar-brand" to="/">
            <img
              src={logo_w}
              style={{
                width: "24px",
                marginRight: "10px",
                verticalAlign: "text-bottom",
              }}
            />
            <span className="align-middle">Track My Money</span>
          </NavLink>
          <ul className="sidebar-nav">
            <li className="sidebar-header">Pages</li>

            <NavLink className="sidebar-item" to="/dashboard">
              <span className="sidebar-link">
                <span className="material-icons-round align-middle">
                  space_dashboard
                </span>
                <span className="align-middle">Dashboard</span>
              </span>
            </NavLink>
            <NavLink className="sidebar-item" to="/addTransaction">
              <span className="sidebar-link">
                <span className="material-icons-round align-middle">
                  add_card
                </span>
                <span className="align-middle">Add Transaction</span>
              </span>
            </NavLink>
            <NavLink className="sidebar-item" to="/viewTransaction">
              <span className="sidebar-link">
                <span className="material-icons-round align-middle">
                  preview
                </span>
                <span className="align-middle">View Transaction</span>
              </span>
            </NavLink>
            <NavLink className="sidebar-item" to="/charts">
              <span className="sidebar-link">
                <span className="material-icons-round align-middle">
                  bar_chart
                </span>
                <span className="align-middle">Graphical View</span>
              </span>
            </NavLink>
            <li className="sidebar-header">Profile</li>
            <NavLink className="sidebar-item" to="/profile">
              <span className="sidebar-link">
                <span className="material-icons-round align-middle">
                  person
                </span>
                <span className="align-middle">View Profile</span>
              </span>
            </NavLink>
            <NavLink
              className="sidebar-item"
              to="/login"
              onClick={() => {
                dispatch(logout());
                localStorage.removeItem("reduxState");
              }}
            >
              <span className="sidebar-link">
                <span className="material-icons-round align-middle">
                  logout
                </span>
                <span className="align-middle">Logout</span>
              </span>
            </NavLink>
          </ul>
        </div>
      </nav>
    </>
  );
};

SideNav.propTypes = {
  sidebarRef: PropTypes.object,
};

export default SideNav;
