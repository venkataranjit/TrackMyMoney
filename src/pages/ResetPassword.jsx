import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { clearMsg } from "../features/auth/forgetPasswordSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const isUser = useSelector((state) => state.forgetPassword);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
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
  });

  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  React.useEffect(() => {
    if (isUser.successMsg) {
      const clear = setTimeout(() => {
        dispatch(
          clearMsg({
            error: "",
            successMsg: "",
          })
        );
      }, 10000);
      return () => clearTimeout(clear);
    }
    if (isUser.error) {
      const clear = setTimeout(() => {
        dispatch(
          clearMsg({
            error: "",
            successMsg: "",
          })
        );
      }, 10000);
      return () => clearTimeout(clear);
    }
  }, [isUser.error, isUser.successMsg]);

  if (isUser.isLoading) {
    return <Loading />;
  }
  return (
    <>
      <main className="d-flex w-100 login">
        <div className="container-fluid d-flex flex-column">
          <div className="row vh-100">
            <div className="col-sm-12 col-md-6 col-lg-7 login-bg p-0">
              <div className="text-center login-left-block">
                <img
                  src={`${
                    import.meta.env.VITE_PUBLIC_IMAGES_URL
                  }/logo-white.png`}
                  alt="logo"
                  className="img-fluid my-2"
                  style={{ width: "84px" }}
                />
                <h1 className="text-info mt-2 mb-3">
                  <b>Track My Money</b>
                </h1>
              </div>
            </div>
            <div className="col-sm-10 col-md-6 col-lg-5 mx-auto d-table h-100">
              <div className="d-table-cell align-middle">
                <div className="card login-box">
                  <div className="card-body">
                    <div className="m-sm-4">
                      <h2 className="mb-3">Reset Password</h2>
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
                                  type={
                                    showPassword.password ? "text" : "password"
                                  }
                                  name="password"
                                  placeholder="Enter password"
                                  autoComplete="new-password"
                                />
                                <span
                                  className="material-icons-round align-middle eye"
                                  onClick={() =>
                                    setShowPassword((prevState) => ({
                                      ...prevState,
                                      password: !showPassword.password,
                                    }))
                                  }
                                >
                                  {showPassword.password
                                    ? "visibility"
                                    : "visibility_off"}
                                </span>
                                {touched.password && errors.password && (
                                  <span className="danger">
                                    {errors.password}
                                  </span>
                                )}
                              </div>
                              <div className="mb-3 eye-pos">
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
                                  type={
                                    showPassword.confirmPassword
                                      ? "text"
                                      : "password"
                                  }
                                  name="confirmPassword"
                                  placeholder="Confirm password"
                                  autoComplete="new-password"
                                />
                                <span
                                  className="material-icons-round align-middle eye"
                                  onClick={() =>
                                    setShowPassword((prevState) => ({
                                      ...prevState,
                                      confirmPassword:
                                        !showPassword.confirmPassword,
                                    }))
                                  }
                                >
                                  {showPassword.confirmPassword
                                    ? "visibility"
                                    : "visibility_off"}
                                </span>
                                {touched.confirmPassword &&
                                  errors.confirmPassword && (
                                    <span className="danger">
                                      {errors.confirmPassword}
                                    </span>
                                  )}
                              </div>
                              <div className="text-center mt-3">
                                <button
                                  className={`btn btn-lg btn-info w-100`}
                                  disabled={!(isValid && dirty)}
                                >
                                  Send
                                </button>
                              </div>
                              <div className="block mt-2">
                                <small className="float-start">
                                  Password Reset Link Send to Mail
                                </small>
                              </div>
                            </Form>
                          );
                        }}
                      </Formik>
                      <br />
                      {isUser.error && (
                        <div className="alert alert-danger">{isUser.error}</div>
                      )}
                      {isUser.successMsg && (
                        <div className="alert alert-success">
                          {isUser.successMsg}
                        </div>
                      )}
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

export default ResetPassword;
