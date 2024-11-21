import PropTypes from "prop-types";

const TopNav = ({ handleSidebar }) => {
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
                className="nav-icon dropdown-toggle d-inline-block d-sm-none"
                href="#"
                data-bs-toggle="dropdown"
              ></a>
              <a
                className="nav-link dropdown-toggle d-none d-sm-inline-block"
                href="#"
                data-bs-toggle="dropdown"
              >
                <span className="text-dark">User Name</span>
              </a>
              <div className="dropdown-menu dropdown-menu-end">
                <a className="dropdown-item" href="pages-profile.html">
                  <span className="material-icons vlb">person_outline</span>
                  Profile
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#">
                  <span className="material-icons vlb">logout</span>
                  Log out
                </a>
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
