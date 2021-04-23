import './App.css';
import LoginPage from "./Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Dashboard from "./Dashboard";

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/login">
              <LoginPage />
          </Route>
          <Route exact path="/signup">
              <SignUP />
          </Route>
          <Route exact path="/">
              <Dashboard />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
