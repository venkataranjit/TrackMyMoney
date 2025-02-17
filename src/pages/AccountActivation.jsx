import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import LogoBlock from "../components/LogoBlock";
import OtpInput from "react-otp-input";

const AccountActivation = () => {
  const dispatch = useDispatch();
  const isUser = useSelector((state) => state.forgetPassword);
  const initialValues = {
    otp: "",
  };

  const validationSchema = Yup.object({});

  const onSubmit = (values, { resetForm }) => {
    resetForm();
    console.log(values.otp);
  };

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
