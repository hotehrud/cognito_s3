import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate, unauthenticated } from 'modules/auth';

import Header from 'layouts/Header';
import Sidebar from 'layouts/Sidebar';
import Home from 'pages/Home';
import PrivateAlbum from 'pages/PrivateAlbum';
import PublicAlbum from 'pages/PublicAlbum';
import Login from 'pages/Login';
import NotFound from 'pages/NotFound';
import 'styles/index.scss';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  const { user, authed } = auth;

  if (user === null && authed === null) {
    return <div>LLLLLLLLLLLLoading</div>;
  }

  return (
    <Route
      {...rest}
      render={props =>
        !authed ? (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

function App() {
  const auth = useSelector(state => ({
    user: state.auth.user,
    authed: state.auth.authed
  }));
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(unauthenticated());
  };

  useEffect(() => {
    const fetch = async () => {
      await dispatch(authenticate());
    };
    fetch();
  }, []);

  return (
    <BrowserRouter>
      <Header user={auth.user} signOut={signOut} />

      <main id="main">
        <Sidebar />
        <section id="container">
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/private" exact auth={auth} component={PrivateAlbum} />
            <Route path="/public" exact component={PublicAlbum} />
            <Route path="/login" exact component={Login} />
            <Route component={NotFound} />
          </Switch>
        </section>
      </main>
    </BrowserRouter>
  );
}

export default App;
