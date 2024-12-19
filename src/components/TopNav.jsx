import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TopNav = ({ handleSidebar }) => {
  const userState = useSelector((state) => state.auth);

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
                href="#"
                data-bs-toggle="dropdown"
              >
                <span className="text-dark">{userState.userName}</span>
              </a>
              <div className="dropdown-menu dropdown-menu-end">
                <Link className="dropdown-item" to="/profile">
                  <span className="material-icons vlb">person_outline</span>
                  Profile
                </Link>
                <div className="dropdown-divider" />
                <Link className="dropdown-item" to="/login">
                  <span className="material-icons vlb">logout</span>
                  Log out
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
