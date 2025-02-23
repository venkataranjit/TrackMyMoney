import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { usePWAInstall } from "react-use-pwa-install";

const SideNav = ({ sidebarRef, handleMobileSidebar }) => {
  const userState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const install = usePWAInstall();
  return (
    <>
      <nav id="sidebar" className="sidebar js-sidebar" ref={sidebarRef}>
        <div className="sidebar-content js-simplebar">
          <NavLink className="sidebar-brand" to="/">
            <img
              src={`${import.meta.env.VITE_PUBLIC_IMAGES_URL}/logo-white.png`}
              style={{
                width: "24px",
                marginRight: "10px",
                verticalAlign: "text-bottom",
              }}
            />
            <span className="align-middle">Track My Money</span>
          </NavLink>

          {userState.user.profilePic && (
            <div className="profilePicDiv">
              <div className="picContianer">
                <img
                  src={userState.user.profilePic}
                  className="leftProfilePic"
                />
              </div>
            </div>
          )}

          <ul className="sidebar-nav">
            <li className="sidebar-header">Pages</li>

            <NavLink
              className="sidebar-item"
              to="/dashboard"
              onClick={handleMobileSidebar}
            >
              <span className="sidebar-link">
                <span className="material-icons-round align-middle">
                  space_dashboard
                </span>
                <span className="align-middle">Dashboard</span>
              </span>
            </NavLink>
            <NavLink
              className="sidebar-item"
              to="/addTransaction"
              onClick={handleMobileSidebar}
            >
              <span className="sidebar-link">
                <span className="material-icons-round align-middle">
                  add_card
                </span>
                <span className="align-middle">Add Transaction</span>
              </span>
            </NavLink>
            <NavLink
              className="sidebar-item"
              to="/viewTransactions"
              onClick={handleMobileSidebar}
            >
              <span className="sidebar-link">
                <span className="material-icons-round align-middle">
                  preview
                </span>
                <span className="align-middle">View Transaction</span>
              </span>
            </NavLink>
            <NavLink
              className="sidebar-item"
              to="/categories"
              onClick={handleMobileSidebar}
            >
              <span className="sidebar-link">
                <span className="material-icons-round align-middle">
                  category
                </span>
                <span className="align-middle">Categories</span>
              </span>
            </NavLink>
            <NavLink
              className="sidebar-item"
              to="/charts"
              onClick={handleMobileSidebar}
            >
              <span className="sidebar-link">
                <span className="material-icons-round align-middle">
                  bar_chart
                </span>
                <span className="align-middle">Graph View</span>
              </span>
            </NavLink>
            {install && (
              <>
                <li className="sidebar-header">App</li>
                <Link className="sidebar-item" to="#" onClick={install}>
                  <span className="sidebar-link">
                    <span className="material-icons-round align-middle">
                      install_mobile
                    </span>
                    <span className="align-middle">Install App</span>
                  </span>
                </Link>
              </>
            )}
            <li className="sidebar-header">Profile</li>
            <NavLink
              className="sidebar-item"
              to="/profile"
              onClick={handleMobileSidebar}
            >
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
  handleMobileSidebar: PropTypes.func,
};

export default SideNav;
