import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import Home from "../Home/Home";
import Navbar from "../NavBar/Navbar"
import CreateUser from "../CreateAccount/CreateAccount"
import CreateGame from '../GameManagement/CreateGame/CreateGame';
import Login from "../Login/Login"

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/create-user" component={CreateUser} />
          <Route exact path="/create-game" component={CreateGame} />
          <Route exact path="/login" component={LogIn} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </React.Fragment>

  );
}

export default App;
