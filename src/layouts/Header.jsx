import React from 'react';
import useReactRouter from 'use-react-router';

import logo from 'assets/images/mygumi.png';

const Header = ({ user, signOut }) => {
  const { history } = useReactRouter();

  const login = () => {
    history.push('/login');
  };

  return (
    <header id="header">
      <div className="logo">
        <img src={logo} alt="mygumi" />
      </div>
      <div>
        {user ? (
          <>
            <strong>{user.email}</strong>
            <button onClick={signOut} type="button" className="btn_comm">
              Logout
            </button>
          </>
        ) : (
          <button onClick={login} type="button" className="btn_comm">
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
