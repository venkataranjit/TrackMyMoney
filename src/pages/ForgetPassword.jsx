import { Field, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LoadCanvasTemplateNoReload,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import * as Yup from "yup";
import { clearMsg, forgetPassword } from "../features/auth/forgetPasswordSlice";
import { Link } from "react-router-dom";
import LogoBlock from "../components/LogoBlock";

const ForgetPassword = () => {
  const [captchaError, setCaptchaError] = useState("");
  const dispatch = useDispatch();
  const isUser = useSelector((state) => state.forgetPassword);
  const initialValues = {
    email: "",
    captcha: "",
  };

  const buttonRef = useRef(null);
  const refreshCaptcha = (e) => {
    e.preventDefault();
    loadCaptchaEnginge(6);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email Format")
      .required("Email required"),
    captcha: Yup.string().required("Captcha is Required"),
  });

  const onSubmit = (values, { resetForm }) => {
    const user_captcha_value = values.captcha;
    if (validateCaptcha(user_captcha_value, false) == true) {
      dispatch(forgetPassword(values.email));
      setCaptchaError("");
      resetForm();
      loadCaptchaEnginge(6);
    } else {
      setCaptchaError("Captcha Does Not Match");
    }
  };

  React.useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  React.useEffect(() => {
    if (isUser.successMsg) {
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
    if (isUser.error) {
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
  }, [isUser.error, isUser.successMsg]);

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
                      <h2 className="mb-3">Forget Password</h2>
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
                                  {isUser.isLoading ? (
                                    <span className="material-icons-round spinner">
                                      brightness_7
                                    </span>
                                  ) : (
                                    "Send Reset Link to Mail"
                                  )}
                                </button>
                              </div>
                              <div className="block mt-2">
                                <small className="float-start">
                                  Already Have an Account?
                                  <Link to="/login"> Login Here</Link>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ForgetPassword;
