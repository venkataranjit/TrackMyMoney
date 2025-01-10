import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <div className="error_page">
        <h2>404</h2>
        <h4>Page Not Found</h4>
        <Link to="/login" className="btn btn-info">
          Back to Home
        </Link>
      </div>
    </>
  );
};

export default Error;
