import './App.css';
import LoginPage from "./Login";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Dashboard from "./Dashboard";
import SignUp from "./SignUp";

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/login">
              <LoginPage />
          </Route>
          <Route exact path="/signup">
              <SignUp />
          </Route>
          <Route exact path="/">
              <Dashboard />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
