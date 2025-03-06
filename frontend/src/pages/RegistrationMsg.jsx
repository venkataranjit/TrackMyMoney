import { useNavigate } from "react-router-dom";
import LogoBlock from "../components/LogoBlock";

const RegistrationMsg = () => {
  const navigate = useNavigate();
  const backToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <main className="d-flex w-100 login">
        <div className="container-fluid d-flex flex-column">
          <div className="row vh-100">
            <LogoBlock />
            <div className="col-sm-10 col-md-6 col-lg-5 mx-auto d-table h-100">
              <div className="d-table-cell align-middle">
                <div className="card login-box">
                  <div className="card-body">
                    <div className="m-sm-4 text-center">
                      <h2 className="mb-3 text-center">
                        Registration Succesfull
                      </h2>
                      <div className="circle-success">
                        <span className="material-icons-round">check</span>
                      </div>
                      <p className="mt-3">
                        You will Receive Account Activation Link Shortly to Your
                        Email
                      </p>
                      <div className="text-center mt-3">
                        <button
                          className={`btn btn-lg btn-info w-100`}
                          onClick={backToLogin}
                        >
                          Back to Login
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default RegistrationMsg;
