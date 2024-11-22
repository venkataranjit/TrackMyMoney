const Boxs = () => {
  return (
    <>
      <div className="row">
        <div className="col-sm-6">
          <div className="card bg-success bg-img">
            <div className="card-body">
              <div className="row">
                <div className="col mt-0">
                  <h5 className="card-title">This Months Income</h5>
                </div>

                <div className="col-auto">
                  <div className="stat text-primary">
                    <span className="material-icons-round align-middle">
                      attach_money
                    </span>
                  </div>
                </div>
              </div>
              <h1 className="mt-1 mb-3">60,000</h1>
            </div>
          </div>
          <div className="card bg-warning bg-img">
            <div className="card-body">
              <div className="row">
                <div className="col mt-0">
                  <h5 className="card-title">Total Income</h5>
                </div>

                <div className="col-auto">
                  <div className="stat text-primary">
                    <span className="material-icons-round align-middle">
                      attach_money
                    </span>
                  </div>
                </div>
              </div>
              <h1 className="mt-1 mb-3">14,212</h1>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card bg-danger bg-img">
            <div className="card-body">
              <div className="row">
                <div className="col mt-0">
                  <h5 className="card-title">This Months Expense</h5>
                </div>

                <div className="col-auto">
                  <div className="stat text-primary">
                    <span className="material-icons-round align-middle">
                      attach_money
                    </span>
                  </div>
                </div>
              </div>
              <h1 className="mt-1 mb-3">25,656</h1>
            </div>
          </div>
          <div className="card bg-primary bg-img">
            <div className="card-body">
              <div className="row">
                <div className="col mt-0">
                  <h5 className="card-title">Total Expense</h5>
                </div>

                <div className="col-auto">
                  <div className="stat text-primary">
                    <span className="material-icons-round align-middle">
                      attach_money
                    </span>
                  </div>
                </div>
              </div>
              <h1 className="mt-1 mb-3">64,256</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Boxs;
