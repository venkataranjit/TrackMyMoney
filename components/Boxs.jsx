import useTransactionStats from "../customeHooks/useTransactionStats";
import { Link } from "react-router-dom";
const Boxs = () => {
  const {
    cumulativeIncome,
    cumulativeExpense,
    currentMonthIncomeHandle,
    currentMonthExpenseHandle,
    lastMonthIncomeHandle,
    lastMonthExpensesHandle,
    lastThreeMonthsIncomeHandle,
    lastThreeMonthsExpenseHandle,
    boxData,
  } = useTransactionStats();

  return (
    <>
      <div className="row">
        <div className="col-sm-6">
          <div className="card bg-success bg-img">
            <ul className="navbar-nav navbar-align pos-abs-link-box">
              <li className="nav-item dropdown">
                <a
                  className="nav-link  d-sm-inline-block"
                  data-bs-toggle="dropdown"
                >
                  <span className="text-dark capitalize">
                    <span className="material-icons-round align-middle">
                      more_vert
                    </span>
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <Link
                    className="dropdown-item"
                    to="#"
                    onClick={currentMonthIncomeHandle}
                  >
                    Current Month Expenses
                  </Link>
                  <div className="dropdown-divider" />
                  <Link
                    className="dropdown-item"
                    to="#"
                    onClick={() => lastMonthIncomeHandle()}
                  >
                    Last Month Expenses
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="#"
                    onClick={() => lastThreeMonthsIncomeHandle()}
                  >
                    Last 3 Month Expenses
                  </Link>
                  <div className="dropdown-divider" />
                </div>
              </li>
            </ul>

            <div className="card-body">
              <div className="row">
                <div className="col mt-0">
                  <h5 className="card-title text-center mb-0">
                    {boxData.incomeTitle}
                  </h5>
                  <h1 className="digital text-center">
                    {(boxData.incomeAmt || 0).toLocaleString()}
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
        </div>
        <div className="col-sm-6">
          <div className="card bg-danger bg-img">
            <ul className="navbar-nav navbar-align pos-abs-link-box">
              <li className="nav-item dropdown">
                <a
                  className="nav-link  d-sm-inline-block"
                  data-bs-toggle="dropdown"
                >
                  <span className="text-dark capitalize">
                    <span className="material-icons-round align-middle">
                      more_vert
                    </span>
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-end">
                  <Link
                    className="dropdown-item"
                    to="#"
                    onClick={() => currentMonthExpenseHandle()}
                  >
                    Current Month Expenses
                  </Link>
                  <div className="dropdown-divider" />
                  <Link
                    className="dropdown-item"
                    to="#"
                    onClick={() => lastMonthExpensesHandle()}
                  >
                    Last Month Expenses
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="#"
                    onClick={() => lastThreeMonthsExpenseHandle()}
                  >
                    Last 3 Month Expenses
                  </Link>
                  <div className="dropdown-divider" />
                </div>
              </li>
            </ul>
            <div className="card-body">
              <div className="row">
                <div className="col mt-0">
                  <h5 className="card-title text-center mb-0">
                    {boxData.expenseTitle}
                  </h5>
                  <h1 className="digital text-center">
                    {(boxData.expenseAmt || 0).toLocaleString()}
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
        </div>
        <div className="col-sm-6">
          <div className="card bg-primary bg-img">
            <div className="card-body">
              <div className="row">
                <div className="col mt-0">
                  <h5 className="card-title text-center mb-0">
                    Cumulative Income
                  </h5>
                  <h1 className="digital text-center">
                    {cumulativeIncome.toLocaleString()}
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
          <div className="card bg-warning bg-img">
            <div className="card-body">
              <div className="row">
                <div className="col mt-0">
                  <h5 className="card-title text-center mb-0">
                    Cumulative Expenses
                  </h5>
                  <h1 className="digital text-center">
                    {cumulativeExpense.toLocaleString()}
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
