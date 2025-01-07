import React from "react";

import { useSelector } from "react-redux";

const RecentTransactions = () => {
  const transactions = useSelector((state) => state.recentTransactions);

  return (
    <>
      <div className="row">
        <div className="col-sm-12">
          <div className="card flex-fill">
            <div className="card-header">
              <h4 className="card-title mb-0">Recent Transactions</h4>
            </div>

            <table className="table table-hover my-0">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th className="d-none d-xl-table-cell">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {transactions.recentTransactions.length !== 0 ? (
                  transactions.recentTransactions.slice(0, 10).map((t) => {
                    return (
                      <tr key={t.id}>
                        <td>{t.amount}</td>
                        <td>{t.transactionDate}</td>

                        <td>
                          <span
                            className={`badge ${
                              t.type.toLowerCase() === "income"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {t.type}
                          </span>
                        </td>
                        <td>{t.category}</td>
                        <td className="d-none d-xl-table-cell">{t.remarks}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5">
                      <span>There are No Recent Transactions</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentTransactions;
