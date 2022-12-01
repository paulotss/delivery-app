import React from 'react';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import Provider from './Context/Provider';
import Login from './pages/Login';

import './App.css';
import Register from './pages/Register';
import Product from './pages/Products';

export function ValidationRoute({ children }) {
  const history = useHistory();
  const { token } = localStorage.getItem('token');
  if (token) return children;
  history.push('/login');
}

// function RedirectLogin() {
//   const history = useHistory();
//   history.push('/login');
// }

function App() {
  return (
    <Provider>
      <Switch>
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/customer/products" component={ Product } />
        <Route exact path="/"><Redirect to="/login" /></Route>
        {/* <Route path="/" component={ <Home /> } /> */}
      </Switch>
    </Provider>
  );
}

export default App;
