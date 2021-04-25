import Debug from "containers/Debug/Debug";
import App from "containers/App/App";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/debug">
          <Debug />
        </Route>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </Router>
  );
};
export default Routes;
