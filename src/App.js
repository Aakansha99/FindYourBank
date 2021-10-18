import React from "react";
import { Switch, Route } from "react-router-dom";
import Table from "./Components/Table";
import BankDetails from "./Components/BankDetail";
import Favorites from "./Components/Favorites";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Table />
        </Route>
        <Route exact path="/allbanks">
          <Table />
        </Route>
        <Route exact path="/bank-details/:ifsc">
          <BankDetails />
        </Route>
        <Route exact path="/favourites">
          <Favorites />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
