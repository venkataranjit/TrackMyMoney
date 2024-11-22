import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container-fluid">
          <div className="row text-muted">
            <div className="col-6 text-start">
              <p className="mb-0">
                <Link className="text-muted" to="#">
                  <strong>Track My Money</strong>
                </Link>{" "}
                © 2024
              </p>
            </div>
            <div className="col-6 text-end">
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
