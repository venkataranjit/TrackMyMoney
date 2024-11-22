import React from "react";
import Heading from "../components/Heading";

const AddTransaction = () => {
  return (
    <>
      <div className="container-fluid p-0 dashboard">
        <div class="row">
          <div className="col-xl-3"></div>
          <div className="col-xl-6 col-xxl-6 d-flex">
            <div className="w-100">
              <Heading heading="Add Transaction" />
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-6 mb-3">
                      <label className="form-label">Amount</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Amount"
                      />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <label className="form-label">Date</label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Select Date"
                      />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <label className="form-label">Type</label>
                      <select class="form-select">
                        <option selected="">Select Type</option>
                        <option value="credit">Expense</option>
                        <option value="income">Income</option>
                        <option value="investment">Investment</option>
                      </select>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <label className="form-label">Category</label>
                      <select class="form-select">
                        <option selected="">Select Category</option>
                        <option value="credit">Expense</option>
                        <option value="income">Income</option>
                        <option value="investment">Investment</option>
                      </select>
                    </div>
                    <div className="col-sm-12 mb-3">
                      <label className="form-label">Remarks</label>
                      <textarea className="form-control"></textarea>
                    </div>
                    <div className="col-sm-12 mb-3">
                      <button type="submit" className="btn btn-info w-100">
                        Add Transaction
                      </button>
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

export default AddTransaction;
