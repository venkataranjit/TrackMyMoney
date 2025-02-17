import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import LogoBlock from "../components/LogoBlock";
import {
  accountActivation,
  clearMsg,
} from "../features/auth/userRegistrationSlice";
import { activatedUserLogin } from "../features/auth/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getUserName } from "../features/auth/resetPasswordSlice";

const AccountActivation = () => {
  const dispatch = useDispatch();
  const isUser = useSelector((state) => state.userRegistration);
  const resetState = useSelector((state) => state.resetPassword);
  const { receivedEmail, receivedToken } = useParams();
  const navigate = useNavigate();
  const initialValues = {
    otp: "",
  };

  const validationSchema = Yup.object({
    otp: Yup.number().required("OTP required"),
  });

  useEffect(() => {
    dispatch(getUserName(receivedEmail));
  }, []);

  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await dispatch(
        accountActivation({
          email: receivedEmail,
          token: receivedToken,
          otp: values.otp,
        })
      ).unwrap(); // Unwrap to get the response directly

      if (response) {
        // Auto-login after activation
        dispatch(activatedUserLogin(response));
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Activation failed:", error);
    } finally {
      resetForm();
    }
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

  return (
    <>
      <main className="d-flex w-100 login">
        <div className="container-fluid d-flex flex-column">
          <div className="row vh-100">
            <LogoBlock />
            <div className="col-sm-8 col-md-6 col-lg-4 mx-auto d-table h-100">
              <div className="d-table-cell align-middle">
                <div className="card login-box">
                  <div className="card-body">
                    <div className="m-sm-4">
                      <h2 className="mb-3">Activate Account</h2>
                      <h5 className="resetUser">
                        Hey,
                        {resetState.user.firstName && (
                          <>
                            {" "}
                            <span
                              style={{ color: "#27b397", fontSize: "20px" }}
                            >
                              <b>
                                {resetState.user.firstName +
                                  " " +
                                  resetState.user.lastName}
                              </b>{" "}
                            </span>
                            <small>Reset Your Password Now</small>
                          </>
                        )}
                      </h5>
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
                                <label className="form-label">
                                  Enter OTP Received on Your email
                                </label>
                                <Field
                                  className={`form-control form-control-lg ${
                                    touched.otp && errors.otp && "danger-border"
                                  }`}
                                  type="number"
                                  name="otp"
                                  placeholder="Enter OTP "
                                />
                                {touched.otp && errors.otp && (
                                  <span className="danger">{errors.otp}</span>
                                )}
                              </div>

                              <div className="text-center mt-3">
                                <button
                                  className={`btn btn-lg btn-info w-100`}
                                  disabled={!(isValid && dirty)}
                                >
                                  {isUser.isLoading ? (
                                    <span className="material-icons-round spinner">
                                      motion_photos_on
                                    </span>
                                  ) : (
                                    "Activate Account"
                                  )}
                                </button>
                              </div>
                              <div className="block mt-2">
                                <small className="float-start">
                                  Enter OTP to Activate Your Account
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

export default AccountActivation;
