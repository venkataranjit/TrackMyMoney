import { Field, Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import {
  loadCaptchaEnginge,
  // LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  // validateCaptcha,
} from "react-simple-captcha";

const Register = () => {
  const refreshCaptcha = (e) => {
    e.preventDefault();
    loadCaptchaEnginge(6);
  };

  React.useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cpassword: "",
    mobile: "",
    captcha: "",
  };

  const onSubmit = (values) => {
    console.log(values);
  };

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
                    <div className="m-sm-4">
                      <div className="text-center">
                        <h4>Register</h4>
                      </div>
                      <Formik initialValues={initialValues} onSubmit={onSubmit}>
                        <Form>
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="mb-3">
                                <label className="form-label">First Name</label>
                                <Field
                                  className="form-control form-control-lg"
                                  type="text"
                                  name="firstName"
                                  placeholder="Enter your Name"
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="mb-3">
                                <label className="form-label">Last Name</label>
                                <Field
                                  className="form-control form-control-lg"
                                  type="text"
                                  name="lastName"
                                  placeholder="Enter your Name"
                                />
                              </div>
                            </div>

                            <div className="col-sm-6">
                              <div className="mb-3">
                                <label className="form-label">Email</label>
                                <Field
                                  className="form-control form-control-lg"
                                  type="email"
                                  name="email"
                                  placeholder="Enter your email"
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="mb-3">
                                <label className="form-label">Mobile</label>
                                <Field
                                  className="form-control form-control-lg"
                                  type="number"
                                  name="mobile"
                                  placeholder="Enter your Mobile"
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="mb-3">
                                <label className="form-label">Password</label>
                                <Field
                                  className="form-control form-control-lg"
                                  type="password"
                                  name="password"
                                  placeholder="Enter password"
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="mb-3">
                                <label className="form-label">
                                  Confirm Password
                                </label>
                                <Field
                                  className="form-control form-control-lg"
                                  type="password"
                                  name="cpassword"
                                  placeholder="Confirm password"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="mb-1 col-sm-6">
                              <label className="form-label">Captcha</label>
                              <Field
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
                                  onClick={refreshCaptcha}
                                >
                                  <span className="material-icons-round align-middle">
                                    refresh
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="block mb-2">
                            {/* <small className="float-start">
                            <Link to="/forgetPassword">Forgot password?</Link>
                          </small> */}
                            <small>
                              Already Have an Account?
                              <Link to="/login"> Login Here</Link>
                            </small>
                          </div>

                          <div className="text-center mt-3">
                            <button className="btn btn-lg btn-info">
                              Register
                            </button>
                          </div>
                        </Form>
                      </Formik>
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
