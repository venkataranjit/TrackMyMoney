import PropTypes from "prop-types";

const SideNav = ({ sidebarRef }) => {
  return (
    <>
      <nav id="sidebar" className="sidebar js-sidebar" ref={sidebarRef}>
        <div className="sidebar-content js-simplebar">
          <a className="sidebar-brand" href="index.html">
            <span className="align-middle">Track My Money</span>
          </a>
          <ul className="sidebar-nav">
            <li className="sidebar-header">Pages</li>
            <li className="sidebar-item">
              <a className="sidebar-link" href="index.html">
                <span className="material-icons-round align-middle">
                  space_dashboard
                </span>
                <span className="align-middle">Dashboard</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link" href="pages-profile.html">
                <span className="material-icons-round align-middle">
                  add_card
                </span>
                <span className="align-middle">Add Transaction</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link" href="pages-sign-in.html">
                <span className="material-icons-round align-middle">
                  preview
                </span>
                <span className="align-middle">View Transactions</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link" href="pages-sign-up.html">
                <i className="align-middle" data-feather="user-plus" />{" "}
                <span className="align-middle">Sign Up</span>
              </a>
            </li>
            <li className="sidebar-item active">
              <a className="sidebar-link" href="pages-blank.html">
                <i className="align-middle" data-feather="book" />{" "}
                <span className="align-middle">Blank</span>
              </a>
            </li>
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
