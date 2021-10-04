import React, {createContext, useReducer} from "react";
import {HashRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import "./app.css";
import Auth from "./pages/auth";
import Main from "./pages";
import {reducer, initialState} from './store';
import {backgroundIcon} from './components/image'

export const Context = createContext();

const useStyles = makeStyles((theme) => ({
  background: {
    height: '100vh',
    width: '100%',
    objectFit: 'cover'
  },
  content: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }
}))

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const classes = useStyles();
  let tempUser = localStorage.getItem('wastemgt_app_user');
  let User = tempUser? JSON.parse(tempUser) : '';

  return (
    <div className="position-relative text-white">
      <img className={classes.background} src={backgroundIcon} alt="bg img"/>
      <div className={classes.content}>
        <Context.Provider value={{state, dispatch}}>
          <Router>
            <Switch>
              <Route path={`/main`}>
                {User && User.name ?
                  <Main/>
                :
                  <Redirect to="/auth"/>
                }
              </Route>

              <Route path={`/auth`}>
                <Auth/>
              </Route>

              <Route path={'/'}>
                <Redirect to="/main"/>
              </Route>
            </Switch>
          </Router>
        </Context.Provider>
      </div>
    </div>
  );
};

export default App;
