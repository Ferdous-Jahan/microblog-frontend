import Login from "./components/Login";
import Registration from "./components/Registration";
import Home from "./components/Home";
import Post from "./components/Post";
import Nav from "./components/Nav";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="App">
      {isLoggedIn && <Nav />}
      <Router>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? <Home /> : <Redirect to="/login" />}
          </Route>
          <Route path="/post/:id" exact>
            {isLoggedIn ? <Post /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login" exact>
            {!isLoggedIn ? <Login /> : <Redirect to="/" />}
          </Route>
          <Route path="/registration" exact>
            {!isLoggedIn ? <Registration /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
