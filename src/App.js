import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { AddShow } from './AddShow'
import { Detail } from './Detail'
import { Update } from './Update'

function App() {
  return (
    <Router>
      <div>
      <Switch>
          <Route exact path="/">
            <AddShow />
          </Route>
          <Route exact path="/detail/:id/">
            <Detail />
          </Route>
          <Route exact path="/:id/update/">
            <Update />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
