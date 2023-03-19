import React, { useState } from "react";

const ExpenseContext = React.createContext({
  expenses: [],
  addExpense: (expense) => {},
  expenselist: (data) => {},
});

export const ExpenseContextProvider = (props) => {
  const [expenses, setExpenses] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const addExpenseHandler = (expense) => {
    console.log(expense);
    setExpenses((prev) => {
      return [...prev, expense];
    });
  };

  const addExpenseFromBackend = (expense) => {
    console.log(expense);
    setExpenseData(expense);
  };
  const values = {
    expenses: expenses,
    addExpense: addExpenseHandler,
    expenselist: addExpenseFromBackend,
    expensedata: expenseData,
  };
  return (
    <ExpenseContext.Provider value={values}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
