import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Heading from "../components/Heading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  clearMsg,
  deleteCategory,
  editCategory,
  getCategory,
  postCategory,
} from "../features/categories/categoriesSlice";
import Loading from "../components/Loading";

const Categories = () => {
  const categoryState = useSelector((state) => state.categories);
  const userDetails = useSelector((state) => state.auth);
  const [edit, setEdit] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const dispatch = useDispatch();
  const initialValues = {
    name: editCategoryId
      ? categoryState.categories.find((c) => c.id === editCategoryId)?.name ||
        ""
      : "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Category is Required"),
  });
  const onSubmit = (values, { resetForm }) => {
    if (edit) {
      dispatch(
        editCategory({
          id: editCategoryId,
          name: values.name,
        })
      );
      setEdit(false);
      setEditCategoryId(null);
    } else {
      dispatch(
        postCategory({
          userId: userDetails.user.id,
          name: values.name,
        })
      );
    }
    resetForm();
  };

  useEffect(() => {
    dispatch(getCategory(userDetails.user.id));
  }, [categoryState.successMsg]);

  const deleteHandler = (id) => {
    dispatch(deleteCategory(id));
  };

  const editHandler = (id) => {
    setEdit(true);
    setEditCategoryId(id);
  };

  useEffect(() => {
    if (categoryState.successMsg || categoryState.error) {
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
  }, [categoryState.successMsg, categoryState.error]);

  if (categoryState.isLoading) {
    <Loading />;
  }
  return (
    <>
      <div className="container-fluid p-0 dashboard">
        <div className="row">
          <div className="col-xl-12 col-xxl-12 d-flex">
            <div className="w-100">
              <Heading heading="Categories" />
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-12">
                      <Formik
                        enableReinitialize
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
                                <div className="col-sm-12 mb-3">
                                  <label className="form-label">
                                    Category Name
                                  </label>
                                  <Field
                                    type="text"
                                    className={`form-control ${
                                      touched.name &&
                                      errors.name &&
                                      "danger-border"
                                    }`}
                                    placeholder="Enter Category Name"
                                    name="name"
                                  />
                                  {touched.name && errors.name && (
                                    <span className="danger">
                                      {" "}
                                      {errors.name}
                                    </span>
                                  )}
                                </div>
                                <div className="col-sm-12 mb-3">
                                  <button
                                    type="submit"
                                    className="btn btn-info w-100"
                                    disabled={!(isValid && dirty)}
                                  >
                                    {edit ? "Edit Category" : "Add Category"}
                                  </button>
                                </div>
                              </div>
                            </Form>
                          );
                        }}
                      </Formik>
                    </div>

                    <div className="col-sm-12 categories_list mt-3">
                      <h6>My Categories</h6>
                      {Array.isArray(categoryState.categories) &&
                        categoryState.categories.map((c) => {
                          return (
                            <button
                              type="button"
                              className="btn btn-light btn-category"
                              key={c.id}
                            >
                              {c.name}
                              <span
                                className="material-icons-round align-middle category_icon category_edit"
                                onClick={() => editHandler(c.id)}
                              >
                                edit
                              </span>
                              <span
                                className="material-icons-round align-middle category_icon category_delete"
                                onClick={() => deleteHandler(c.id)}
                              >
                                delete
                              </span>
                            </button>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
