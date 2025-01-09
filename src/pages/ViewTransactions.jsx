import React, { useEffect } from "react";
import Heading from "../components/Heading";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { recentTransactions } from "../features/transactions/recentTransactionsSlice";

const ViewTransactions = () => {
  const userDetails = useSelector((state) => state.auth);
  const transactions = useSelector((state) => state.recentTransactions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(recentTransactions(userDetails.user.id));
  }, []);

  function convertArrayOfObjectsToCSV(array) {
    if (!array || array.length === 0) {
      return null;
    }
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(array[0]).filter(
      (key) => key !== "id" && key !== "userId" && key !== "updatedAt"
    );

    result = "";
    result += keys
      .map((key) => key.charAt(0).toUpperCase() + key.slice(1))
      .join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        // Manipulate data before adding to CSV
        if (key !== "id" && key !== "userId" && key !== "updatedAt") {
          // Exclude 'id' and 'userId' from the CSV
          result += item[key];
        }

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = "transactions.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

  const Export = ({ onExport }) => (
    <button
      className="btn btn-primary"
      onClick={(e) => onExport(e.target.value)}
    >
      Export
    </button>
  );

  const columns = [
    {
      name: "Amount",
      selector: (row) => row.amount,
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
      selector: () => (
        <>
          <button className="btn text-success btn-sm">
            <span className="material-icons-round align-middle">edit</span>
          </button>
        </>
      ),
      style: {
        width: "70px",
      },
    },
    {
      name: "Delete",
      selector: () => (
        <>
          <button className="btn text-danger btn-sm">
            <span className="material-icons-round align-middle">delete</span>
          </button>
        </>
      ),
    },
  ];

  const data = transactions.recentTransactions.map((transaction) => {
    const formattedTransactionDate = new Date(transaction.transactionDate)
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-");
    return {
      ...transaction,
      transactionDate: formattedTransactionDate,
      remarks: transaction.remarks === "" ? " ----- " : transaction.remarks,
    };
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
    () => <Export onExport={() => downloadCSV(data)} />,
    [data]
  );

  return (
    <>
      <div className="container-fluid p-0 dashboard">
        <div className="row">
          <div className="col-xl-12 col-xxl-12 d-flex">
            <div className="w-100">
              <Heading heading="View Transactions" />
              <div className="card flex-fill">
                <DataTable
                  columns={columns}
                  data={data}
                  pagination
                  paginationPerPage={6}
                  paginationRowsPerPageOptions={[6, 10, 15]}
                  expandableRows
                  expandableRowsComponent={expandableRowsComponent}
                  actions={actionsMemo}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTransactions;
