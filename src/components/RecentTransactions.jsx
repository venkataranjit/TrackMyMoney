import React from "react";

const RecentTransactions = () => {
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
                <tr>
                  <td>25,000</td>
                  <td>01/01/2021</td>
                  <td>
                    <span className="badge bg-success">Credit</span>
                  </td>

                  <td>Category</td>
                  <td className="d-none d-xl-table-cell">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentTransactions;
