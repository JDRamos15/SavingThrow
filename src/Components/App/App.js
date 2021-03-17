import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "../Home/Home";
import CreateUser from "../CreateAccount/CreateAccount"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/create-user" component={CreateUser} />
        {/*<Route exact path="/login" component={LogIn} />
        <Route exact path="/profile:email" component={Profike} />*/}
        {/* <Route exact path="/home" component={Home} /> */}
        {/* In case no route does not exist, can create a 404 page341 */}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
