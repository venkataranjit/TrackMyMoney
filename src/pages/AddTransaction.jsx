import { useEffect } from "react";
import Heading from "../components/Heading";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import {
  addTransaction,
  clearMsg,
} from "../features/addTransaction/addTransactionSlice";
import Loading from "../components/Loading";
import {
  getCategory,
  postCategory,
} from "../features/categories/categoriesSlice";

const AddTransaction = () => {
  const addTransactionState = useSelector((state) => state.addTransaction);
  const myCategories = useSelector((state) => state.categories);
  const authUser = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const initialValues = {
    amount: "",
    transactionDate: "",
    type: "",
    category: "",
    customCategory: "",
    remarks: "",
  };

  const validationSchema = Yup.object({
    amount: Yup.number().required("Amount is Required"),
    transactionDate: Yup.string().required("Date is Required"),
    type: Yup.string().required("Transaction Type is Required"),
    category: Yup.string().required("Category is Required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    await dispatch(
      addTransaction({
        userId: authUser.user.id === null ? "admin" : authUser.user.id,
        amount: values.amount,
        transactionDate: values.transactionDate,
        type: values.type,
        category:
          values.category === "addNewCategory"
            ? values.customCategory === ""
              ? "Others"
              : values.customCategory
            : values.category,
        remarks: values.remarks,
      })
    ).unwrap();
    if (values.category === "addNewCategory" && values.customCategory) {
      await dispatch(
        postCategory({ userId: authUser.user.id, name: values.customCategory })
      );
    }
    resetForm();
  };

  useEffect(() => {
    if (addTransactionState.successMsg || addTransactionState.error) {
      const timer = setTimeout(() => {
        dispatch(
          clearMsg({
            successMsg: null,
            error: null,
          })
        );
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [addTransactionState.successMsg, addTransactionState.error]);

  useEffect(() => {
    dispatch(getCategory(authUser.user.id));
  }, [myCategories.successMsg]);

  if (addTransactionState.isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="container-fluid p-0 dashboard">
        <div className="row">
          <div className="col-xl-12 col-xxl-12 d-flex">
            <div className="w-100">
              <Heading heading="Add Transaction" />
              <div className="card">
                <div className="card-body">
                  <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                  >
                    {(formikProps) => {
                      const { errors, touched, isValid, dirty, values } =
                        formikProps;
                      return (
                        <Form>
                          <div className="row">
                            <div className="col-sm-3 mb-3">
                              <label className="form-label">Amount</label>
                              <Field
                                type="number"
                                className={`form-control ${
                                  touched.amount &&
                                  errors.amount &&
                                  "danger-border"
                                }`}
                                placeholder="Enter Amount"
                                name="amount"
                              />
                              {touched.amount && errors.amount && (
                                <span className="danger"> {errors.amount}</span>
                              )}
                            </div>
                            <div className="col-sm-3 mb-3">
                              <label className="form-label">
                                Transaction Date
                              </label>
                              <Field
                                type="date"
                                name="transactionDate"
                                className={`form-control ${
                                  touched.transactionDate &&
                                  errors.transactionDate &&
                                  "danger-border"
                                }`}
                                placeholder="Select Date"
                              />
                              {touched.transactionDate &&
                                errors.transactionDate && (
                                  <span className="danger">
                                    {" "}
                                    {errors.transactionDate}
                                  </span>
                                )}
                            </div>
                            <div className="col-sm-3 mb-3">
                              <label className="form-label">Type</label>
                              <Field
                                as="select"
                                name="type"
                                className={`form-select ${
                                  touched.type && errors.type && "danger-border"
                                }`}
                              >
                                <option disabled value="">
                                  Select Type
                                </option>
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                              </Field>
                              {touched.type && errors.type && (
                                <span className="danger"> {errors.type}</span>
                              )}
                            </div>
                            <div className="col-sm-3 mb-3">
                              <label className="form-label">Category</label>
                              <Field
                                as="select"
                                name="category"
                                className={`form-select ${
                                  touched.category &&
                                  errors.category &&
                                  "danger-border"
                                }`}
                              >
                                <option disabled value="">
                                  Select Category
                                </option>
                                <option value="addNewCategory">
                                  Add New Category
                                </option>
                                {myCategories.categories?.length > 0 ? (
                                  myCategories.categories.map((c) => {
                                    return (
                                      <option value={c.name} key={c.id}>
                                        {c.name}
                                      </option>
                                    );
                                  })
                                ) : (
                                  <option disabled>No Categories Found</option>
                                )}
                              </Field>
                              {touched.category && errors.category && (
                                <span className="danger">
                                  {" "}
                                  {errors.category}
                                </span>
                              )}
                              {values.category === "addNewCategory" && (
                                <>
                                  <Field
                                    type="text"
                                    name="customCategory"
                                    className={`mt-2 form-control ${
                                      touched.customCategory &&
                                      errors.customCategory &&
                                      "danger-border"
                                    }`}
                                    placeholder="Add Category"
                                  ></Field>
                                  {touched.customCategory &&
                                    errors.customCategory && (
                                      <span className="danger">
                                        {errors.customCategory}
                                      </span>
                                    )}
                                </>
                              )}
                            </div>
                            <div className="col-sm-12 mb-3">
                              <label className="form-label">Remarks</label>
                              <Field
                                as="textarea"
                                placeholder="Enter Remarks"
                                className="form-control"
                                name="remarks"
                              ></Field>
                            </div>
                            <div className="col-sm-12 mb-3">
                              <button
                                type="submit"
                                className="btn btn-info w-100"
                                disabled={!(isValid && dirty)}
                              >
                                Add Transaction
                              </button>
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
      {addTransactionState.successMsg && (
        <div className="alert alert-success">
          {addTransactionState.successMsg}
        </div>
      )}
      {addTransactionState.error && (
        <div className="alert alert-danger">{addTransactionState.error}</div>
      )}
      {myCategories.error && (
        <div className="alert alert-danger">{myCategories.error}</div>
      )}
    </>
  );
};

export default AddTransaction;
