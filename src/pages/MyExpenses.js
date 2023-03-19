import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseContext from "../store/expense-context";
import classes from "./MyExpenses.module.css";

const MyExpenses = () => {
  
  const expenseCtx = useContext(ExpenseContext);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios
      .get("https://tracker-118e0-default-rtdb.firebaseio.com/tracker.json")
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          const loadedExpenses = [];
          for (const key in response.data) {
            loadedExpenses.push({
              id: key,
              amount: response.data[key].amount,
              description: response.data[key].description,
              category: response.data[key].category,
            });
          }
          setExpenses(loadedExpenses);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addExpenseHandler = (expense) => {
    axios
      .post(
        "https://tracker-118e0-default-rtdb.firebaseio.com/tracker.json",
        expense
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          expenseCtx.addExpense({ id: response.data.name, ...expense });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const expenseList = expenses.map((expense) => {
    return (
      <li className={classes.expenseitem} key={expense.id}>
        <div>${expense.amount}</div>
        <div>{expense.description}</div>
        <div>{expense.category}</div>
      </li>
    );
  });

  return (
    <div className={classes.expensebox}>
      <h1>Expenses</h1>
      <ExpenseForm onAddExpense={addExpenseHandler} />
      <div className={classes.expenseheading}>
        <h2>Amount</h2>
        <h2 className={classes.description}>Description</h2>
        <h2>Category</h2>
      </div>
      <ul className={classes.expenselist}>{expenseList}</ul>
    </div>
  );
};

export default MyExpenses;
