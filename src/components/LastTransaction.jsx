import React from "react";

const LastTransaction = () => {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="card flex-fill">
            <div className="card-header">
              <h4 className="card-title mb-0">Last Transaction</h4>
            </div>
            <table className="table table-hover my-0">
              <thead>
                <tr>
                  <th>Amount</th>
                  <td>25,000</td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td>01/01/2021</td>
                </tr>
                <tr>
                  <th>Type</th>
                  <td>
                    <span className="badge bg-success">Credit</span>
                  </td>
                </tr>
                <tr>
                  <th>Category</th>
                  <td>Category</td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default LastTransaction;
