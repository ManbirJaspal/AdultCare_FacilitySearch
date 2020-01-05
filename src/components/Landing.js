import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import Header from './Header';
import history from '../history';
import MapContainer from '../components/gmaps/mapapp';
import Login from '../components/landing/Login';
import RenderList from '../components/search/RenderList'
import SearchFacilities from '../components/search/SearchFacilities';
import Quiz from '../components/quiz/MainQuiz';
import "./quiz/style.css"

const Landing = () => {
  return(
    <div style={{maxHeight: "10vh"}}>
      <Router history={history}>
        <Header />
        <div>
          <Switch>
            <Route className="login" path ="/" exact component={Login} />
            <Route className="quiz" path="/quiz" exact component={Quiz} />
            <Route path="/maps" exact component={MapContainer} />
            <Route  path="/search" exact component={SearchFacilities} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default Landing;
