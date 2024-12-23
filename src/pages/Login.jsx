import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import {
  LoadCanvasTemplateNoReload,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";

const Login = () => {
  const [formData, setFormData] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [showPassword, setShowpassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
    captcha: "",
  };
  const refreshCaptcha = (e) => {
    e.preventDefault();
    loadCaptchaEnginge(6);
  };

  React.useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email Format")
      .required("Email required"),
    password: Yup.string().required("Password is Required"),
    captcha: Yup.string().required("Captcha is Required"),
  });

  const onSubmit = (values, { resetForm }) => {
    const user_captcha_value = values.captcha;
    if (validateCaptcha(user_captcha_value, false) == true) {
      setFormData({ email: values.email, password: values.password });
      setCaptchaError("");
      resetForm();
      loadCaptchaEnginge(6);
    } else {
      setCaptchaError("Captcha Does Not Match");
    }
  };
  console.log(formData);
  return (
    <>
      <main className="d-flex w-100 login">
        <div className="container d-flex flex-column">
          <div className="row vh-100">
            <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
              <div className="d-table-cell align-middle">
                <div className="text-center">
                  <img
                    src={`${import.meta.env.VITE_PUBLIC_URL}/logo.png`}
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
                    <div
                      className="text-center bg-light p-2"
                      style={{ borderRadius: "5px" }}
                    >
                      <h4 className="m-0">Login</h4>
                    </div>
                    <div className="m-sm-4">
                      <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                      >
                        {(formikProps) => {
                          const { errors, touched, isValid, dirty } =
                            formikProps;
                          return (
                            <Form>
                              <div className="mb-3">
                                <label className="form-label">Email</label>
                                <Field
                                  className={`form-control form-control-lg ${
                                    touched.email &&
                                    errors.email &&
                                    "danger-border"
                                  }`}
                                  type="email"
                                  name="email"
                                  placeholder="Enter your email"
                                />
                                {touched.email && errors.email && (
                                  <span className="danger">{errors.email}</span>
                                )}
                              </div>
                              <div className="mb-3 eye-pos">
                                <label className="form-label">Password</label>
                                <Field
                                  className={`form-control form-control-lg ${
                                    touched.password &&
                                    errors.password &&
                                    "danger-border"
                                  }`}
                                  type={showPassword ? "text" : "password"}
                                  name="password"
                                  placeholder="Enter your password"
                                />
                                <span
                                  className="material-icons-round align-middle eye"
                                  onClick={() => setShowpassword(!showPassword)}
                                >
                                  {showPassword
                                    ? "visibility"
                                    : "visibility_off"}
                                </span>
                                {touched.password && errors.password && (
                                  <span className="danger">
                                    {errors.password}
                                  </span>
                                )}
                              </div>
                              <div className="row">
                                <div className="mb-1 col-sm-6">
                                  <label className="form-label">Captcha</label>
                                  <Field
                                    className={`form-control form-control-lg ${
                                      touched.captcha &&
                                      errors.captcha &&
                                      "danger-border"
                                    }`}
                                    type="text"
                                    name="captcha"
                                    placeholder="Enter Captcha"
                                  />
                                  {touched.captcha && errors.captcha && (
                                    <span className="danger">
                                      {errors.captcha}
                                    </span>
                                  )}
                                  {captchaError && (
                                    <span className="danger">
                                      {captchaError}
                                    </span>
                                  )}
                                </div>
                                <div className="col-sm-6 mb-1">
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
                                  Dont Have an Account?
                                  <Link to="/register"> Register Here</Link>
                                </small>
                              </div>

                              <div className="text-center mt-3">
                                <button
                                  className="btn btn-lg btn-info"
                                  disabled={!(isValid && dirty)}
                                >
                                  Sign in
                                </button>
                              </div>
                            </Form>
                          );
                        }}
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

export default Login;
