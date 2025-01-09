import { useState } from "react";
import Heading from "../components/Heading";
import { useSelector, useDispatch } from "react-redux";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { userEdit } from "../features/auth/userEditSlice";
import { updateUser } from "../features/auth/authSlice";
import Loading from "../components/Loading";

const Profile = () => {
  const userDetails = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);

  const initialValues = {
    firstName: userDetails.user.firstName,
    lastName: userDetails.user.lastName,
    mobile: userDetails.user.mobile,
    password: userDetails.user.password,
  };

  const validation = Yup.object({
    firstName: Yup.string()
      .required("First Name Required")
      .min(3, "First Name Must be 3 Characters"),
    lastName: Yup.string()
      .required("Last Name Required")
      .min(3, "Last Name Must be 3 Characters"),
    mobile: Yup.string()
      .required("Mobile Number Required")
      .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
  });

  const submitHandler = async (values) => {
    const updatedUser = await dispatch(
      userEdit({ id: userDetails.user.id, ...values })
    ).unwrap();
    dispatch(updateUser(updatedUser));
    setEdit(false);
  };

  if (userDetails.isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="container-fluid p-0 dashboard">
        <div className="row">
          <div className="col-xl-12 col-xxl-12 d-flex">
            <div className="w-100">
              <Heading heading="Profile" />
              <div className="card">
                <div className="card-body">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validation}
                    onSubmit={submitHandler}
                  >
                    {(formikProps) => {
                      const { errors, touched } = formikProps;
                      return (
                        <Form>
                          <div className="row">
                            <div className="col-lg-3 col-sm-6 mb-3">
                              <label className="form-label">First Name</label>
                              <Field
                                type="text"
                                className={`form-control ${
                                  touched.firstName &&
                                  errors.firstName &&
                                  "danger-border"
                                }`}
                                name="firstName"
                                readOnly={!edit}
                              />
                              {touched.firstName && errors.firstName && (
                                <span className="danger">
                                  {errors.firstName}
                                </span>
                              )}
                            </div>
                            <div className="col-lg-3 col-sm-6 mb-3">
                              <label className="form-label">Last Name</label>
                              <Field
                                type="text"
                                className={`form-control ${
                                  touched.lastName &&
                                  errors.lastName &&
                                  "danger-border"
                                }`}
                                name="lastName"
                                readOnly={!edit}
                              />
                              {touched.lastName && errors.lastName && (
                                <span className="danger">
                                  {errors.lastName}
                                </span>
                              )}
                            </div>
                            <div className="col-lg-3 col-sm-6 mb-3">
                              <label className="form-label">Mobile</label>
                              <Field
                                type="number"
                                className={`form-control ${
                                  touched.mobile &&
                                  errors.mobile &&
                                  "danger-border"
                                }`}
                                name="mobile"
                                readOnly={!edit}
                              />
                              {touched.mobile && errors.mobile && (
                                <span className="danger">{errors.mobile}</span>
                              )}
                            </div>
                            <div className="col-lg-3 col-sm-6 mb-3">
                              <label className="form-label">Password</label>
                              <Field
                                type="password"
                                className={`form-control ${
                                  touched.password &&
                                  errors.password &&
                                  "danger-border"
                                }`}
                                placeholder="********"
                                name="password"
                                readOnly={!edit}
                              />
                              {touched.password && errors.password && (
                                <span className="danger">
                                  {errors.password}
                                </span>
                              )}
                            </div>
                            <div className="col-sm-12 mb-3">
                              {edit ? (
                                <div className="row">
                                  <div className="col-6">
                                    <button
                                      onClick={() => setEdit(false)}
                                      className="btn btn-danger w-100"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                  <div className="col-6">
                                    <button
                                      type="submit"
                                      className="btn btn-success w-100"
                                    >
                                      Save Profile
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setEdit(true)}
                                  className="btn btn-info w-100"
                                >
                                  Edit Profile
                                </button>
                              )}
                            </div>
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
    </>
  );
};

export default Profile;
