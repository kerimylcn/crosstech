import TaskPage from "./Pages/Task/TaskPage";
import LoginPage from './Pages/Login/LoginPage';
import { Provider } from 'mobx-react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import initializeStores from './Stores/StoreInitializer';


function App() {

  const stores = initializeStores();
  return (
    <Provider {...stores}>


        <Router>

        <Switch>

          <PublicRoute path="/login">
            <LoginPage />
          </PublicRoute>

          <PrivateRoute path="/">
            <TaskPage />
          </PrivateRoute>  

        </Switch>

      </Router>


    </Provider>
  );
}


function PrivateRoute ({ children, ...rest }) {
  return (
    <Route {...rest} render={() => {
      return localStorage.getItem("TODOAPPJWTKEY") !== null
        ? children
        : <Redirect to='/login' />
    }} />
  )
}

function PublicRoute ({ children, ...rest }) {
  return (
    <Route {...rest} render={() => {
      return localStorage.getItem("TODOAPPJWTKEY") === null
        ? children
        : <Redirect to='/' />
    }} />
  )
}

export default App;
