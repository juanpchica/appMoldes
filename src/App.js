import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Molde } from "./components/Molde";
import { Header } from './components/Header';
import { Body } from './components/Body';
import { Error } from './components/Error';
import { Activar } from "./components/Activar";

function App() { 
  return (
    <section>
      <Router basename={'/'}>
        <Header />
        <Switch>
          <Route exact path="/">
            <Body />
          </Route>
          <Route path="/molde/:id" children={<Molde />}></Route>
          <Route path="/activar/">
            <Activar />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Router>
    </section>

  );
}

export default App;
