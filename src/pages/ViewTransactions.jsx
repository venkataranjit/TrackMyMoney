import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { getTransactions } from "../features/transactions/getTransactionsSlice";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  clearMsg,
  deleteTransaction,
} from "../features/transactions/deleteTransactionSlice";
import Loading from "../components/Loading";
import Modal from "react-modal";
import EditTransaction from "../components/EditTransaction";
import { editClearMsg } from "../features/transactions/EditTransactionSlice";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

const ViewTransactions = () => {
  const userDetails = useSelector((state) => state.auth);
  const transactions = useSelector((state) => state.transactions);
  const editTransactionState = useSelector((state) => state.editTransaction);
  console.log(transactions);
  const deleteTransactionState = useSelector(
    (state) => state.deleteTransaction
  );
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  useEffect(() => {
    dispatch(getTransactions(userDetails.user.id));
  }, [dispatch, userDetails.user.id, editTransactionState.successMsg]);

  useEffect(() => {
    if (
      deleteTransactionState.successMsg ||
      deleteTransactionState.error ||
      editTransactionState.successMsg ||
      editTransactionState.error
    ) {
      const timer = setTimeout(() => {
        dispatch(
          clearMsg({
            successMsg: null,
            error: null,
          })
        );
      }, 5000);
      const timer2 = setTimeout(() => {
        dispatch(
          editClearMsg({
            successMsg: null,
            error: null,
          })
        );
      }, 5000);
      return () => {
        clearTimeout(timer);
        clearTimeout(timer2);
      };
    }
  }, [
    deleteTransactionState.successMsg,
    deleteTransactionState.error,
    editTransactionState.successMsg,
    editTransactionState.error,
  ]);

  function downloadPDF(array) {
    const doc = new jsPDF();
    doc.setFontSize(13);
    doc.text("Transactions Report", 10, 10);

    autoTable(doc, {
      head: [["S.No", "Amount", "Date", "Type", "Category", "Remarks"]],
      body: array.map((transaction, index) => [
        index + 1,
        transaction.amount.toLocaleString(),
        transaction.transactionDate,
        transaction.type,
        transaction.category,
        transaction.remarks,
      ]),
      startY: 20,
    });

    doc.save("transactions.pdf");
  }
  // eslint-disable-next-line react/prop-types
  const Export = ({ onExportPDF }) => (
    <>
      <button
        className="btn btn-info btn-sm"
        onClick={(e) => {
          onExportPDF(e.target.value);
          toast.success("PDF File Exported");
        }}
      >
        Export to PDF
      </button>
    </>
  );

  const columns = [
    {
      name: "Amount",
      selector: (row) => row.amount.toLocaleString(),
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.transactionDate,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      cell: (row) => (
        <span
          className={`badge ${
            row.type?.toLowerCase() === "income" ? "bg-success" : "bg-danger"
          }`}
        >
          {row.type}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Edit",
      selector: (row) => (
        <>
          <button className="btn text-success btn-sm">
            <span
              className="material-icons-round align-middle"
              onClick={() => {
                setTransactionToEdit(row);
                setEditModal(true);
              }}
            >
              edit
            </span>
          </button>
        </>
      ),
      style: {
        width: "70px",
      },
    },
    {
      name: "Delete",
      selector: (row) => (
        <>
          <button
            className="btn text-danger btn-sm"
            // onClick={() => deleteHandler(row.id)}
            onClick={() => {
              setTransactionToDelete(row.id); // Store the transaction ID here
              setDeleteModal(true);
            }}
          >
            <span className="material-icons-round align-middle">delete</span>
          </button>
        </>
      ),
    },
  ];

  const data = transactions.transactions.map((transaction) => {
    const formattedTransactionDate = new Date(transaction.transactionDate)
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-");
    return {
      ...transaction,
      transactionDate: formattedTransactionDate,
      remarks: transaction.remarks === "" ? " ----- " : transaction.remarks,
    };
  });

  const searchedData = data.filter((t) => {
    const matchesSearch =
      t.amount.toString().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategorySearch = t.category
      .toLowerCase()
      .includes(categorySearch.toLowerCase());

    // If either search term or category search is filled, return true if any condition matches
    return (
      (search === "" || matchesSearch) &&
      (categorySearch === "" || matchesCategorySearch)
    );
  });

  const expandableRowsComponent = ({ data }) => (
    <>
      <p className="m-2">
        Remarks Details:{" "}
        {data.remarks === "" ? "No remarks available" : data.remarks}
      </p>
    </>
  );

  const actionsMemo = React.useMemo(
    () => (
      <Export
        onExportPDF={() => downloadPDF(searchedData)}
        search={search}
        setSearch={setSearch}
      />
    ),
    [searchedData, search]
  );
  const deleteHandler = async (id) => {
    await dispatch(deleteTransaction(id));
    dispatch(getTransactions(userDetails.user.id));
  };

  if (deleteTransactionState.isLoading) {
    return <Loading />;
  }
  if (editTransactionState.isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="container-fluid p-0 dashboard">
        <div className="row">
          <div className="col-xl-12 col-xxl-12 d-flex">
            <div className="w-100">
              <Heading heading="View Transactions" />
              <div className="card flex-fill transactions-card">
                <div className="search-Feilds">
                  <input
                    type="text"
                    className="form-control"
                    name="search"
                    value={search}
                    placeholder="Search"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <select
                    className="form-select"
                    onChange={(e) => setCategorySearch(e.target.value)}
                    value={categorySearch}
                  >
                    <option disabled value="">
                      Search Category
                    </option>
                    <option value="">All</option>
                    {Array.from(
                      new Set(
                        transactions.transactions.map(
                          (transaction) => transaction.category
                        )
                      ) // Get unique categories
                    ).map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <DataTable
                  columns={columns}
                  data={searchedData}
                  pagination
                  paginationPerPage={5}
                  paginationRowsPerPageOptions={[5, 10, 15]}
                  expandableRows
                  expandableRowsComponent={expandableRowsComponent}
                  actions={actionsMemo}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={deleteModal}
        onRequestClose={() => setDeleteModal(false)}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          content: {
            width: "400px",
            margin: "auto",
            padding: "20px",
            borderRadius: "10px",
            height: "fit-content",
          },
        }}
      >
        <h3 style={{ marginTop: "10px", marginBottom: "30px" }}>
          Delete Transaction
        </h3>
        <p>Are You Sure You Want to Delete Transaction?</p>
        <button
          className="btn btn-info w-100"
          onClick={() => {
            deleteHandler(transactionToDelete);
            setDeleteModal(false);
          }}
        >
          Delete
        </button>
        <button
          onClick={() => setDeleteModal(false)}
          className="btn btn-info modalClose"
        >
          <span className="material-icons-round align-middle p-0">close</span>
        </button>
      </Modal>
      <Modal
        isOpen={editModal}
        onRequestClose={() => setEditModal(false)}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          content: {
            width: "500px",
            margin: "auto",
            padding: "20px",
            borderRadius: "10px",
            height: "fit-content",
          },
        }}
      >
        <h3 style={{ marginTop: "10px", marginBottom: "30px" }}>
          Edit Transaction
        </h3>
        <EditTransaction
          transactionToEdit={transactionToEdit}
          transactions={transactions}
          setEditModal={setEditModal}
        />
        <button
          onClick={() => setEditModal(false)}
          className="btn btn-info modalClose"
        >
          <span className="material-icons-round align-middle p-0">close</span>
        </button>
      </Modal>
    </>
  );
};

export default ViewTransactions;
