import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Error = () => {
  const userDetails = useSelector((state) => state.auth);
  return (
    <>
      <div className="error_page">
        <h2>
          4<span className="">0</span>4
        </h2>
        <h4>Page Not Found</h4>
        {userDetails.user.email ? (
          <Link to="/dashboard" className="btn btn-info">
            Back to Dashboard
          </Link>
        ) : (
          <Link to="/login" className="btn btn-info">
            Back to Login Page
          </Link>
        )}
      </div>
    </>
  );
};

export default Error;
