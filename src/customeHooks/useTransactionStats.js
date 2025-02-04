import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const initialData = {
  incomeTitle: "",
  expenseTitle: "",
  incomeAmt: "",
  expenseAmt: "",
};

const useTransactionStats = () => {
  const transactions = useSelector((state) => state.transactions);

  const [boxData, setBoxData] = useState(initialData);

  const cumulativeIncome = transactions.transactions.reduce((total, t) => {
    return t?.type?.toLowerCase() === "income"
      ? total + Number(t.amount)
      : total;
  }, 0);

  const cumulativeExpense = transactions.transactions.reduce((total, t) => {
    return t?.type?.toLowerCase() === "expense"
      ? total + Number(t.amount)
      : total;
  }, 0);

  const currentMonthIncome = transactions.transactions.reduce((total, t) => {
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

  const currentMonthExpense = transactions.transactions.reduce((total, t) => {
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
  }, 0);

  const lastMonthIncome = transactions.transactions.reduce((total, t) => {
    if (t?.type?.toLowerCase() === "income") {
      const transactionDate = new Date(t.transactionDate);
      const currentDate = new Date();

      const previousMonth =
        currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;
      const previousYear =
        currentDate.getMonth() === 0
          ? currentDate.getFullYear() - 1
          : currentDate.getFullYear();

      if (
        transactionDate.getFullYear() === previousYear &&
        transactionDate.getMonth() === previousMonth
      ) {
        return total + Number(t.amount);
      }
    }
    return total;
  }, 0);

  const lastMonthExpense = transactions.transactions.reduce((total, t) => {
    if (t?.type?.toLowerCase() === "expense") {
      const transactionDate = new Date(t.transactionDate);
      const currentDate = new Date();

      const previousMonth =
        currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;
      const previousYear =
        currentDate.getMonth() === 0
          ? currentDate.getFullYear() - 1
          : currentDate.getFullYear();

      if (
        transactionDate.getFullYear() === previousYear &&
        transactionDate.getMonth() === previousMonth
      ) {
        return total + Number(t.amount);
      }
    }
    return total;
  }, 0);

  const lastThreeMonthsIncome = transactions.transactions.reduce((total, t) => {
    if (t?.type?.toLowerCase() === "income") {
      const transactionDate = new Date(t.transactionDate);
      const currentDate = new Date();

      // Calculate the start date for the three-month range
      const threeMonthsAgo = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 2,
        1
      );

      // Calculate the end date (last moment of the current month)
      const endOfCurrentMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      );

      // Check if the transaction date falls within the range
      if (
        transactionDate >= threeMonthsAgo &&
        transactionDate <= endOfCurrentMonth
      ) {
        return total + Number(t.amount);
      }
    }
    return total;
  }, 0);

  const lastThreeMonthsExpense = transactions.transactions.reduce(
    (total, t) => {
      if (t?.type?.toLowerCase() === "expense") {
        const transactionDate = new Date(t.transactionDate);
        const currentDate = new Date();

        // Calculate the start date for the three-month range
        const threeMonthsAgo = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 2,
          1
        );

        // Calculate the end date (last moment of the current month)
        const endOfCurrentMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0,
          23,
          59,
          59,
          999
        );

        // Check if the transaction date falls within the range
        if (
          transactionDate >= threeMonthsAgo &&
          transactionDate <= endOfCurrentMonth
        ) {
          return total + Number(t.amount);
        }
      }
      return total;
    },
    0
  );

  const currentMonthIncomeHandle = () => {
    setBoxData((prevData) => {
      return {
        ...prevData,
        incomeTitle: "Current Month Income",
        incomeAmt: currentMonthIncome,
      };
    });
  };
  const lastMonthIncomeHandle = () => {
    setBoxData((p) => {
      return {
        ...p,
        incomeTitle: "Last Month Income",
        incomeAmt: lastMonthIncome,
      };
    });
  };
  const lastThreeMonthsIncomeHandle = () => {
    setBoxData((p) => {
      return {
        ...p,
        incomeTitle: "Last 3 Month's Income",
        incomeAmt: lastThreeMonthsIncome,
      };
    });
  };

  const currentMonthExpenseHandle = () => {
    setBoxData((p) => {
      return {
        ...p,
        expenseTitle: "Current Month Expense",
        expenseAmt: currentMonthExpense,
      };
    });
  };
  const lastMonthExpensesHandle = () => {
    setBoxData((p) => {
      return {
        ...p,
        expenseTitle: "Last Month Expense",
        expenseAmt: lastMonthExpense,
      };
    });
  };
  const lastThreeMonthsExpenseHandle = () => {
    setBoxData((p) => {
      return {
        ...p,
        expenseTitle: "Last 3 Months Expense",
        expenseAmt: lastThreeMonthsExpense,
      };
    });
  };

  useEffect(() => {
    currentMonthIncomeHandle();
    currentMonthExpenseHandle();
  }, [currentMonthExpense, currentMonthIncome]);

  return {
    cumulativeIncome,
    cumulativeExpense,
    currentMonthIncome,
    currentMonthExpense,
    lastMonthIncome,
    lastMonthExpense,
    lastThreeMonthsIncome,
    lastThreeMonthsExpense,
    currentMonthIncomeHandle,
    currentMonthExpenseHandle,
    lastMonthIncomeHandle,
    lastMonthExpensesHandle,
    lastThreeMonthsIncomeHandle,
    lastThreeMonthsExpenseHandle,
    boxData,
  };
};

export default useTransactionStats;
