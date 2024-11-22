import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <main className="d-flex w-100 login">
        <div className="container d-flex flex-column">
          <div className="row vh-100">
            <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
              <div className="d-table-cell align-middle">
                <div className="text-center">
                  <img
                    src="/public/logo.png"
                    alt="logo"
                    className="img-fluid mb-3"
                    style={{ width: "64px" }}
                  />
                  <h2 className="text-info mb-3">
                    <b>Track My Money</b>
                  </h2>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="text-center">
                      <h4>Login</h4>
                    </div>
                    <div className="m-sm-4">
                      <form>
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            className="form-control form-control-lg"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                          />
                        </div>
                        <div className="mb-1">
                          <label className="form-label">Password</label>
                          <input
                            className="form-control form-control-lg"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                          />
                        </div>
                        <div className="block mb-5">
                          {/* <small className="float-start">
                            <Link to="/forgetPassword">Forgot password?</Link>
                          </small> */}
                          <small className="float-end">
                            Dont Have an Account?
                            <Link to="/register"> Register Here</Link>
                          </small>
                        </div>

                        <div className="text-center mt-3">
                          <button className="btn btn-lg btn-info">
                            Sign in
                          </button>
                        </div>
                      </form>
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

export default Login;
