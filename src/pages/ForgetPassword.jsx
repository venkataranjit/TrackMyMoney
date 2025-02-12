import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { clearMsg, forgetPassword } from "../features/auth/forgetPasswordSlice";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const isUser = useSelector((state) => state.forgetPassword);
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email Format")
      .required("Email required"),
  });

  const onSubmit = (values, { resetForm }) => {
    dispatch(forgetPassword(values.email));
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
                  src="/images/logo-white.png"
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

export default ForgetPassword;
