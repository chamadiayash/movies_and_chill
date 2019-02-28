import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.4.0";

// import Components from "views/Components/Components.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import MoviePage from "views/MoviePage/MoviePage.jsx";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/movie" component={MoviePage} />
      <Route path="/profile/:profileId" component={ProfilePage} />
      <Route path="/search/:searchQuery" component={ProfilePage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
