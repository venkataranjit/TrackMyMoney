import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import {
  loadCaptchaEnginge,
  // LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
  // validateCaptcha,
} from "react-simple-captcha";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [captchaError, setCaptchaError] = useState("");
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
    confirmPassword: "",
    mobile: "",
    captcha: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("Enter First Name")
      .min(3, "First Name Must be 3 Characters"),
    lastName: Yup.string()
      .required("Enter Last Name")
      .min(3, "Last Name Must be 3 Characters"),
    email: Yup.string()
      .email("Invalid Email Format")
      .required("Email required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: Yup.string()
      .required("Confirm Password required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    mobile: Yup.string()
      .required("Mobile Number Required")
      .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
    captcha: Yup.string().required("Captcha Required"),
  });

  const onSubmit = (values, { resetForm }) => {
    let user_captcha_value = values.captcha;
    if (validateCaptcha(user_captcha_value, false) == true) {
      setFormData({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        mobile: values.mobile,
        password: values.password,
      });
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
                    className="img-fluid my-2"
                    style={{ width: "32px" }}
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
                      <h4 className="m-0">Register</h4>
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
                              <div className="row">
                                <div className="col-sm-6">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      First Name
                                    </label>

                                    <Field
                                      className={`form-control form-control-lg ${
                                        touched.firstName &&
                                        errors.firstName &&
                                        "danger-border"
                                      }`}
                                      type="text"
                                      name="firstName"
                                      placeholder="Enter First Name"
                                    />
                                    {touched.firstName && errors.firstName && (
                                      <span className="danger">
                                        {errors.firstName}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      Last Name
                                    </label>
                                    <Field
                                      className={`form-control form-control-lg ${
                                        touched.lastName &&
                                        errors.lastName &&
                                        "danger-border"
                                      }`}
                                      type="text"
                                      name="lastName"
                                      placeholder="Enter Last Name"
                                    />
                                    {touched.lastName && errors.lastName && (
                                      <span className="danger">
                                        {errors.lastName}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="col-sm-6">
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
                                      autoComplete="username"
                                    />
                                    {touched.email && errors.email && (
                                      <span className="danger">
                                        {errors.email}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="mb-3">
                                    <label className="form-label">Mobile</label>
                                    <Field
                                      className={`form-control form-control-lg ${
                                        touched.mobile &&
                                        errors.mobile &&
                                        "danger-border"
                                      }`}
                                      type="number"
                                      name="mobile"
                                      placeholder="Enter your Mobile"
                                    />
                                    {touched.mobile && errors.mobile && (
                                      <span className="danger">
                                        {errors.mobile}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      Password
                                    </label>
                                    <Field
                                      className={`form-control form-control-lg ${
                                        touched.password &&
                                        errors.password &&
                                        "danger-border"
                                      }`}
                                      type="password"
                                      name="password"
                                      placeholder="Enter password"
                                      autoComplete="new-password"
                                    />
                                    {touched.password && errors.password && (
                                      <span className="danger">
                                        {errors.password}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      Confirm Password
                                    </label>
                                    <Field
                                      className={`form-control form-control-lg ${
                                        touched.confirmPassword &&
                                        errors.confirmPassword
                                          ? "danger-border"
                                          : ""
                                      }`}
                                      type="password"
                                      name="confirmPassword"
                                      placeholder="Confirm password"
                                      autoComplete="new-password"
                                    />
                                    {touched.confirmPassword &&
                                      errors.confirmPassword && (
                                        <span className="danger">
                                          {errors.confirmPassword}
                                        </span>
                                      )}
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="mb-1 col-sm-6">
                                  <label className="form-label">Captcha</label>
                                  <Field
                                    className={`form-control form-control-lg ${
                                      touched.captcha &&
                                      errors.captcha &&
                                      "danger-border"
                                    } ${captchaError && "danger-border"}`}
                                    type="text"
                                    name="captcha"
                                    placeholder="Enter Captcha"
                                  />
                                  {captchaError && (
                                    <span className="danger">
                                      {captchaError}
                                    </span>
                                  )}
                                  {touched.captcha && errors.captcha && (
                                    <span className="danger">
                                      {errors.captcha}
                                    </span>
                                  )}
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
                                <button
                                  type="submit"
                                  className="btn btn-lg btn-info"
                                  disabled={!(isValid && dirty)}
                                >
                                  Register
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

export default Register;
