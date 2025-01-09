import { useSelector } from "react-redux";

const Boxs = () => {
  const transactions = useSelector((state) => state.recentTransactions);

  const totalIncome = transactions.recentTransactions.reduce((total, t) => {
    return t?.type?.toLowerCase() === "income"
      ? total + Number(t.amount)
      : total;
  }, 0);

  const totalExpense = transactions.recentTransactions.reduce((total, t) => {
    return t?.type?.toLowerCase() === "expense"
      ? total + Number(t.amount)
      : total;
  }, 0);

  const thisMonthIncome = transactions.recentTransactions.reduce((total, t) => {
    // Check if the type is "income" and the date is in the current month
    if (t?.type?.toLowerCase() === "income") {
      const transactionDate = new Date(t.transactionDate);
      const currentDate = new Date();

      if (
        transactionDate.getFullYear() === currentDate.getFullYear() &&
        transactionDate.getMonth() === currentDate.getMonth()
      ) {
        return total + Number(t.amount);
      }
    }
    return total;
  }, 0);

  const thisMonthExpense = transactions.recentTransactions.reduce(
    (total, t) => {
      // Check if the type is "income" and the date is in the current month
      if (t?.type?.toLowerCase() === "expense") {
        const transactionDate = new Date(t.transactionDate);
        const currentDate = new Date();

        if (
          transactionDate.getFullYear() === currentDate.getFullYear() &&
          transactionDate.getMonth() === currentDate.getMonth()
        ) {
          return total + Number(t.amount);
        }
      }
      return total;
    },
    0
  );

  return (
    <>
      <div className="row">
        <div className="col-sm-6">
          <div className="card bg-success bg-img">
            <div className="card-body">
              <div className="row">
                <div className="col mt-0">
                  <h5 className="card-title text-center mb-0">
                    Income This Month
                  </h5>
                  <h1 className="digital text-center">
                    {thisMonthIncome.toLocaleString()}
                  </h1>
                </div>
              </div>

              <div className="col-auto pos-rupee">
                <div className="stat text-success">
                  <span className="rupee">&#8377;</span>
                </div>
              </div>
            </div>
          </div>
          <div className="card bg-primary bg-img">
            <div className="card-body">
              <div className="row">
                <div className="col mt-0">
                  <h5 className="card-title text-center mb-0">
                    Cumulative Income
                  </h5>
                  <h1 className="digital text-center">
                    {totalIncome.toLocaleString()}
                  </h1>
                </div>
              </div>

              <div className="col-auto pos-rupee">
                <div className="stat text-primary">
                  <span className="rupee">&#8377;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card bg-danger bg-img">
            <div className="card-body">
              <div className="row">
                <div className="col mt-0">
                  <h5 className="card-title text-center mb-0">
                    Expense This Month
                  </h5>
                  <h1 className="digital text-center">
                    {thisMonthExpense.toLocaleString()}
                  </h1>
                </div>
              </div>
              <div className="col-auto pos-rupee">
                <div className="stat text-danger">
                  <span className="rupee">&#8377;</span>
                </div>
              </div>
            </div>
          </div>
          <div className="card bg-warning bg-img">
            <div className="card-body">
              <div className="row">
                <div className="col mt-0">
                  <h5 className="card-title text-center mb-0">
                    Cumulative Expenses
                  </h5>
                  <h1 className="digital text-center">
                    {totalExpense.toLocaleString()}
                  </h1>
                </div>
              </div>
              <div className="col-auto pos-rupee">
                <div className="stat text-warning">
                  <span className="rupee">&#8377;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Boxs;
