import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";

const Register = () => {
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
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
                    className="img-fluid"
                  />
                  <h2 className="text-info">Track My Money</h2>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="m-sm-4">
                      <div className="text-center">
                        <h4>Register</h4>
                      </div>
                      <form>
                        <div className="mb-3">
                          <label className="form-label">Name</label>
                          <input
                            className="form-control form-control-lg"
                            type="text"
                            name="name"
                            placeholder="Enter your Name"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            className="form-control form-control-lg"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Password</label>
                          <input
                            className="form-control form-control-lg"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                          />
                        </div>
                        <div className="row">
                          <div className="mb-1 col-sm-6">
                            <label className="form-label">Captcha</label>
                            <input
                              className="form-control form-control-lg"
                              type="text"
                              name="captcha"
                              placeholder="Enter Captcha"
                            />
                          </div>
                          <div className="col-sm-6">
                            <label className="form-label">&nbsp;</label>
                            <div className="captcha-container">
                              <LoadCanvasTemplateNoReload />
                              <button
                                className="btn btn-info"
                                onClick={() => loadCaptchaEnginge(6)}
                              >
                                <span className="material-icons-round align-middle">
                                  refresh
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="block mb-5">
                          {/* <small className="float-start">
                            <Link to="/forgetPassword">Forgot password?</Link>
                          </small> */}
                          <small className="float-end">
                            Already Have an Account?
                            <Link to="/login"> Login Here</Link>
                          </small>
                        </div>

                        <div className="text-center mt-3">
                          <button className="btn btn-lg btn-info">
                            Register
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

export default Register;
