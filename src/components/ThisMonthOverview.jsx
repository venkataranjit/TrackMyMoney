import React from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#00C49F", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.25;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ThisMonthOverview = () => {
  const transactions = useSelector((state) => state.recentTransactions);

  const thisMonthtIncome = transactions.recentTransactions.reduce(
    (total, t) => {
      if (t?.type?.toLowerCase() === "income") {
        const currentDate = new Date();
        const transactionDate = new Date(t.transactionDate);
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

  const thisMonthtExpense = transactions.recentTransactions.reduce(
    (total, t) => {
      if (t?.type?.toLowerCase() === "expense") {
        const currentDate = new Date();
        const transactionDate = new Date(t.transactionDate);
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

  const data = [
    { name: "Income", value: thisMonthtIncome },
    { name: "Expense", value: thisMonthtExpense },
  ];

  return (
    <>
      <div className="card">
        <div className="card_title p-3">
          <h4 className="card-title mb-0">This Month Overview</h4>
        </div>
        <div className="card_body">
          <div className="row">
            <div
              className="col-sm-12"
              style={{
                width: "100%",
                height: "200px",
              }}
            >
              {data[0].value !== 0 || data[1].value !== 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius="100%"
                      innerRadius="30%"
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p style={{ textAlign: "center" }}>
                  This Month There are No Transactions
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThisMonthOverview;
