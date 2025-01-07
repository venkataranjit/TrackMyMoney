import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { recentTransactions } from "../features/transactions/recentTransactionsSlice";

const LastTransaction = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.recentTransactions);

  const lastTransaction = transactions.recentTransactions
    .slice(0, 1)
    .map((t) => t);

  useEffect(() => {
    dispatch(recentTransactions());
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="card flex-fill">
            <div className="card-header">
              <h4 className="card-title mb-0">Last Transaction</h4>
            </div>
            {lastTransaction[0] ? (
              <table className="table table-hover my-0">
                <thead>
                  <tr>
                    <th>Amount</th>
                    <td>{lastTransaction[0].amount}</td>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <td>{lastTransaction[0].transactionDate}</td>
                  </tr>
                  <tr>
                    <th>Type</th>
                    <td>
                      <span
                        className={`badge ${
                          lastTransaction[0].type.toLowerCase() === "income"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {lastTransaction[0].type}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>Category</th>
                    <td>{lastTransaction[0].category}</td>
                  </tr>
                </thead>
              </table>
            ) : (
              "Please Do Atleast One Transaction"
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LastTransaction;
