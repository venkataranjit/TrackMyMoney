import { useEffect, useMemo } from "react";
import Heading from "../components/Heading";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Rectangle,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../features/transactions/getTransactionsSlice";

const Charts = () => {
  const userDetails = useSelector((state) => state.auth);
  const transactions = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactions(userDetails.user.id));
  }, []);

  const chartData = useMemo(() => {
    if (!transactions.transactions) return [];

    const last12Months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return {
        month: date.toLocaleString("default", { month: "short" }),
        year: date.getFullYear(),
        key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}`,
        Income: 0,
        Expense: 0,
      };
    }).reverse();

    transactions.transactions.forEach((transaction) => {
      const date = new Date(transaction.transactionDate);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}`;
      const monthData = last12Months.find((month) => month.key === key);

      if (monthData) {
        if (transaction.type === "income") {
          monthData.Income += transaction.amount;
        } else if (transaction.type === "expense") {
          monthData.Expense += transaction.amount;
        }
      }
    });

    return last12Months;
  }, [transactions.transactions]);

  return (
    <>
      <div className="container-fluid p-0 dashboard">
        <div className="row">
          <div className="col-xl-12 col-xxl-12 d-flex">
            <div className="w-100">
              <Heading heading="Last 12 Months Data" />
              <div className="card">
                <div className="card-body">
                  <ResponsiveContainer width={"100%"} height={400}>
                    <BarChart
                      data={chartData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="month"
                        label={{
                          value: "Month",
                          position: "insideBottom",
                          offset: -5,
                        }}
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="Income"
                        fill="#1cbb8c"
                        activeBar={<Rectangle stroke="#454545" />}
                      />
                      <Bar
                        dataKey="Expense"
                        fill="#fd7e14"
                        activeBar={<Rectangle stroke="#454545" />}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Charts;
