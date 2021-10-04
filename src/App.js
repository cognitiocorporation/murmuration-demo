import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Parse from 'parse';

import routes from "./routes";
import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/main.scss";

// i18n

import { withTranslation } from 'react-i18next';


// Parse.serverURL = 'http://prgaapp808.global.baxter.com:1337/parse' //'https://mymurmuration.app/parse';http://prgaapp808.global.baxter.com:3000
// 
// // App ID
// Parse.initialize("Murmuration"); //App ID, Javascript Key
// Parse.masterKey = 'Murmuration2021' // Master Key

Parse.serverURL = 'https://parseapi.back4app.com' //'https://mymurmuration.app/parse';

// App ID
Parse.initialize("2HhXUK7WLziNFrTIRmNK6yRH2Dh8yZaKzSC5R9iX", "vvDugDploO2NpaknUc0H3c31xmjDneDLivua6VTn"); //App ID, Javascript Key
Parse.masterKey = 'HnNfJbhjfA3oi1we5JdtgjsgIfOGzUu46OEQ3lyQ' // Master Key

var currentUser = Parse.User.current();

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
     isLogged
      ? <Component {...props}/> //<Component {...props}/>//console.log(...props)
      : <Redirect to={"/login"} />
  )}/>
)

var isActive = function() {
  var today = new Date();
  today.setHours(0,0,0,0);

  var finalDate = new Date();
  finalDate.setHours(0,0,0,0);

  const isActive = false
  if (today.getTime >= finalDate.getTime) {
    isActive =  false
  } else {
    isActive = true
  }
  return true
}

var isLogged = false;

function auth() {
  isLogged = true;
}

const App = ({ t, i18n }) => (
  <Router basename={process.env.REACT_APP_BASENAME || ""}>
    <div>
      {routes.map((route, index) => {
        if (!route.protected) {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={withTracker(props => {
                return (
                  <route.component handleAuth={auth} {...props} />
                );
              })}
            />
          );
        } else {
          return (
          <PrivateRoute 
            key={index}
            path={route.path}
            exact={route.exact} 
            component={withTracker(props => {
              return (
                <route.layout {...props}><route.component {...props} /> </route.layout>
              );
            })}/>
          );
        }

      })}
    </div>
  </Router>
);

export default withTranslation()(App)
