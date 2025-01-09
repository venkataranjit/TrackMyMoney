import React, { useEffect, useMemo } from "react";
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
import { recentTransactions } from "../features/transactions/recentTransactionsSlice";

const Charts = () => {
  const userDetails = useSelector((state) => state.auth);
  const transactions = useSelector((state) => state.recentTransactions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(recentTransactions(userDetails.user.id));
  }, []);

  const chartData = useMemo(() => {
    if (!transactions.recentTransactions) return [];

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

    transactions.recentTransactions.forEach((transaction) => {
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
  }, [transactions.recentTransactions]);
  return (
    <>
      <div className="container-fluid p-0 dashboard">
        <div className="row">
          <div className="col-xl-12 col-xxl-12 d-flex">
            <div className="w-100">
              <Heading heading="Charts" />
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title mb-0">Last 12 Months Data</h4>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width={"100%"} height={300}>
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
