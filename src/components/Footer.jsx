import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container-fluid">
          <div className="row text-muted">
            <div className="col-5 text-start">
              <p className="mb-0">
                <Link className="text-muted" to="#">
                  <strong>
                    <img
                      src="/images/logo-footer.png"
                      className="logo-footer"
                      alt="logo"
                    />{" "}
                    Track My Money
                  </strong>
                </Link>{" "}
                © 2025
              </p>
            </div>
            <div className="col-7 text-end">
              <ul className="list-inline">
                <li className="list-inline-item">
                  <Link className="text-muted" to="#">
                    Designed & Developed by <b>Ranjit</b>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
