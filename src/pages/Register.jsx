import { Field, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  clearMsg,
  userRegistration,
} from "../features/auth/userRegistrationSlice";
import * as Yup from "yup";
import {
  loadCaptchaEnginge,
  // LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import { useDispatch, useSelector } from "react-redux";
import bcrypt from "bcryptjs";
import LogoBlock from "../components/LogoBlock";
import { toast } from "react-toastify";
import PwaBtn from "../components/PwaBtn";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userRegistration);
  const [error, setError] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const buttonRef = useRef(null);

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

  const onSubmit = async (values, { resetForm }) => {
    const hashedPassword = await bcrypt.hash(values.password.trim(), 10);
    let user_captcha_value = values.captcha;

    if (!validateCaptcha(user_captcha_value, false)) {
      setCaptchaError("Captcha Does Not Match");
      return;
    }

    try {
      await dispatch(
        userRegistration({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email.trim().toLowerCase(),
          mobile: values.mobile,
          password: hashedPassword, // Consider hashing on the backend
        })
      ).unwrap(); // Ensures errors are caught properly

      // Reset form, captcha, and clear errors after successful registration
      setCaptchaError("");
      resetForm();
      loadCaptchaEnginge(6);

      navigate("/registrationMsg"); // Navigate only after success
    } catch (error) {
      setError(`Error during user registration: ${error.message || error}`);
    }
  };

  error && toast.error(error);

  React.useEffect(() => {
    if (user.successMsg) {
      const clear = setTimeout(() => {
        dispatch(
          clearMsg({
            error: "",
            successMsg: "",
          })
        );
      }, 2000);

      return () => {
        clearTimeout(clear);
      };
    }
    if (user.error) {
      const clear = setTimeout(() => {
        dispatch(
          clearMsg({
            error: "",
            successMsg: "",
          })
        );
      }, 10000);

      return () => {
        clearTimeout(clear);
      };
    }
  }, [user.error, user.successMsg]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (buttonRef.current) {
        buttonRef.current.click();
      }
    }
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
                    <div className="m-sm-4">
                      <h2 className="mb-3">Register</h2>
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
                                  <div className="mb-3 eye-pos">
                                    <label className="form-label">
                                      Password
                                    </label>
                                    <Field
                                      className={`form-control form-control-lg ${
                                        touched.password &&
                                        errors.password &&
                                        "danger-border"
                                      }`}
                                      type={
                                        showPassword.password
                                          ? "text"
                                          : "password"
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
                                </div>
                                <div className="col-sm-6">
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
                                    onKeyDown={handleKeyDown}
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

                              <div className="text-center mt-3">
                                <button
                                  type="submit"
                                  className="btn btn-lg btn-info w-100"
                                  disabled={!(isValid && dirty)}
                                  ref={buttonRef}
                                >
                                  {user.isLoading ? (
                                    <span className="material-icons-round spinner">
                                      motion_photos_on
                                    </span>
                                  ) : (
                                    "Register"
                                  )}
                                </button>
                              </div>
                              <div className="block mt-2">
                                <small className="float-start">
                                  <Link to="/forgetPassword">
                                    Forgot password?
                                  </Link>
                                </small>
                                <small className="float-end">
                                  Already Have an Account?
                                  <Link to="/login"> Login Here</Link>
                                </small>
                              </div>
                            </Form>
                          );
                        }}
                      </Formik>
                    </div>
                  </div>
                  <PwaBtn />
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
