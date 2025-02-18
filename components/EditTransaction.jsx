import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { editTransaction } from "../features/transactions/EditTransactionSlice";
import { getCategory } from "../features/categories/categoriesSlice";
import { useEffect } from "react";

const EditTransaction = ({ transactionToEdit, transactions, setEditModal }) => {
  const dispatch = useDispatch();
  const myCategories = useSelector((state) => state.categories);
  const authUser = useSelector((state) => state.auth);
  console.log(myCategories.categories);
  const initialValues = {
    id: transactionToEdit.id,
    amount: transactionToEdit.amount,
    transactionDate: transactionToEdit.transactionDate
      ? (() => {
          const [day, month, year] =
            transactionToEdit.transactionDate.split("-");
          return `${year}-${month}-${day}`; // Convert to YYYY-MM-DD
        })()
      : "",
    type: transactionToEdit.type,
    category: transactionToEdit.category,
    remarks:
      transactionToEdit.remarks === " ----- " ? "" : transactionToEdit.remarks,
  };
  const validationSchema = Yup.object({
    amount: Yup.number().required("Amount is Required"),
    transactionDate: Yup.string().required("Date is Required"),
    type: Yup.string().required("Transaction Type is Required"),
    category: Yup.string().required("Category is Required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    dispatch(editTransaction(values));
    resetForm();
    setEditModal(false);
  };

  useEffect(() => {
    dispatch(getCategory(authUser.user.id));
  }, []);

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formikProps) => {
          const { errors, touched } = formikProps;
          return (
            <Form>
              <div className="row">
                <div className="col-sm-6 mb-3">
                  <fieldset>Amount</fieldset>
                  <Field
                    type="number"
                    className={`form-control ${
                      touched.amount && errors.amount && "danger-border"
                    }`}
                    name="amount"
                  />
                  {touched.amount && errors.amount && (
                    <span className="danger"> {errors.amount}</span>
                  )}
                </div>
                <div className="col-sm-6  mb-3">
                  <fieldset>Transaction Date</fieldset>
                  <Field
                    type="date"
                    className={`form-control ${
                      touched.transactionDate &&
                      errors.transactionDate &&
                      "danger-border"
                    }`}
                    name="transactionDate"
                  />
                  {touched.transactionDate && errors.transactionDate && (
                    <span className="danger"> {errors.transactionDate}</span>
                  )}
                </div>

                <div className="col-sm-6 mb-3">
                  <fieldset>Type</fieldset>
                  <Field
                    as="select"
                    name="type"
                    className={`form-select ${
                      touched.type && errors.type && "danger-border"
                    }`}
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </Field>
                  {touched.type && errors.type && (
                    <span className="danger"> {errors.type}</span>
                  )}
                </div>
                <div className="col-sm-6 mb-3">
                  <fieldset>Category</fieldset>
                  <Field
                    as="select"
                    name="category"
                    className={`form-select ${
                      touched.category && errors.category && "danger-border"
                    }`}
                  >
                    {myCategories?.categories?.map((category, index) => (
                      <option key={index} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </Field>
                  {touched.category && errors.category && (
                    <span className="danger"> {errors.category}</span>
                  )}
                </div>
                <div className="col-sm-12">
                  <fieldset>Remarks</fieldset>
                  <Field
                    as="textarea"
                    className="form-control mb-3"
                    name="remarks"
                  ></Field>
                </div>
                <div className="col-sm-12">
                  <button type="submit" className="btn btn-info w-100">
                    Update
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

EditTransaction.propTypes = {
  transactionToEdit: PropTypes.shape({
    id: PropTypes.string,
    transactionDate: PropTypes.string,
    amount: PropTypes.number,
    type: PropTypes.string,
    category: PropTypes.string,
    remarks: PropTypes.string,
  }),
  transactions: PropTypes.shape({
    transactions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        transactionDate: PropTypes.string,
        amount: PropTypes.number,
        type: PropTypes.string,
        category: PropTypes.string,
        remarks: PropTypes.string,
      })
    ),
  }),
  setEditModal: PropTypes.func,
};

export default EditTransaction;
