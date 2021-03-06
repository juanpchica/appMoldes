import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Molde } from "./components/Molde";
import { Header } from './components/Header';
import { Body } from './components/Body';
import { Error } from './components/Error';

function App() { 
  return (
    <section>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Body />
          </Route>
          <Route path="/molde/:id" children={<Molde />}></Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Router>
    </section>

  );
}

export default App;
