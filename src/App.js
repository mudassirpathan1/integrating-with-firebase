import { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./Layout/Header";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import MyExpenses from "./pages/MyExpenses";
import UpdateProfile from "./pages/UpdateProfile";
import Welcome from "./pages/Welcome";
import { ExpenseContextProvider } from "./store/expense-context";

function App() {
  return (
    <Fragment>
      <Header />
      <ExpenseContextProvider>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/welcome">
          <Welcome />
        </Route>
        <Route path='/expenses'>
          <MyExpenses/>
        </Route>
        <Route path="/updateprofile">
          <UpdateProfile />
        </Route>
        <Route path="/resetpassword">
          <ForgotPassword />
        </Route>
      </Switch>
      </ExpenseContextProvider>
    </Fragment>
  );
}

export default App;
