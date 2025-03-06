import useTransactionStats from "../customeHooks/useTransactionStats";

const AvailableBalance = () => {
  const { cumulativeIncome, cumulativeExpense } = useTransactionStats();
  return (
    <>
      <div className="card bg-img two-cards-height available_balance">
        <div className="card-body">
          <div className="row">
            <div className="col mt-0 margin-top-lg">
              <h5 className="card-title text-center mb-0">
                Current Account Balance
              </h5>
              <h1 className="digital text-center">
                {(cumulativeIncome - cumulativeExpense).toLocaleString()}
              </h1>
            </div>
          </div>

          <div className="col-auto pos-rupee">
            <div className="stat text-secondary">
              <span className="rupee">&#8377;</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AvailableBalance;
