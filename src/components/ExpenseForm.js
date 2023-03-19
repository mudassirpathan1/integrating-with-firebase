import axios from 'axios';
import React, { useContext, useRef } from 'react'
import ExpenseContext from '../store/expense-context';
import classes from './ExpenseForm.module.css'
const ExpenseForm = () => {
    const amountInputRef = useRef();
    const descriptionInputRef = useRef();
    const categoryInputRef = useRef();
    const expenseCtx = useContext(ExpenseContext);
    const addExpenseHandler = (e) => {
        e.preventDefault();
    
        const newExpense = {
          id: Math.random(),
          amount: amountInputRef.current.value,
          description: descriptionInputRef.current.value,
          category: categoryInputRef.current.value,
        };
        expenseCtx.addExpense(newExpense);

        axios.post("https://tracker-118e0-default-rtdb.firebaseio.com/tracker.json",{
            id: Math.random(),
          amount: amountInputRef.current.value,
          description: descriptionInputRef.current.value,
          category: categoryInputRef.current.value,
        })
        .then((res)=>{
            console.log(res.data.name);
        })
        .catch(err=>{
            console.log(err);
        })
      };
    
  return (
    <div>
      <form onSubmit={addExpenseHandler} className={classes.expenseform}>
        <label htmlFor="amount">Money Spent</label>
        <input type="text" id="amount" ref={amountInputRef} />
        <label htmlFor="description">Description</label>
        <input type="text" id="description" ref={descriptionInputRef} />
        <label htmlFor="category">Category</label>
        <select name="category" id="category" ref={categoryInputRef}>
          <option value="food">Food</option>
          <option value="fuel">Fuel</option>
          <option value="movie">Movie</option>
          <option value="medicine">Medicine</option>
          <option value="entertainment">Entertainment</option>
          <option value="education">Education</option>
        </select>
        <button>Add Expense</button>
      </form>
    </div>
  )
}

export default ExpenseForm
