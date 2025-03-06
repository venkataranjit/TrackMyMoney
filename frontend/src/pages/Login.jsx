import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import {
  LoadCanvasTemplateNoReload,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import { useDispatch, useSelector } from "react-redux";
import { clearMsg, userLogin } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import LogoBlock from "../components/LogoBlock";
import PwaBtn from "../components/PwaBtn";

const Login = () => {
  const [captchaError, setCaptchaError] = useState("");
  const [showPassword, setShowpassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  const buttonRef = React.useRef(null);

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
      dispatch(
        userLogin({
          email: values.email.toLowerCase(),
          password: values.password,
        })
      );
      setCaptchaError("");
      resetForm();
      loadCaptchaEnginge(6);
    } else {
      setCaptchaError("Captcha Does Not Match");
    }
  };

  React.useEffect(() => {
    if (user.successMsg) {
      loadCaptchaEnginge(6);
      const clear = setTimeout(() => {
        dispatch(
          clearMsg({
            error: "",
            successMsg: "",
          })
        );
        navigate("/dashboard");
      }, 10);
      return () => clearTimeout(clear);
    }
    if (user.error) {
      loadCaptchaEnginge(6);
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
                      <h2 className="mb-3">Login</h2>
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
                                  onKeyDown={handleKeyDown}
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
                                  onKeyDown={handleKeyDown}
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
                                    onKeyDown={handleKeyDown}
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

                              <div className="text-center mt-3">
                                <button
                                  className={`btn btn-lg btn-info w-100`}
                                  disabled={!(isValid && dirty)}
                                  ref={buttonRef}
                                >
                                  {user.isLoading ? (
                                    <span className="material-icons-round spinner">
                                      motion_photos_on
                                    </span>
                                  ) : (
                                    "Login"
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
                                  Dont Have an Account?
                                  <Link to="/register"> Register Here</Link>
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

export default Login;
