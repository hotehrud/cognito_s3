import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from 'logo.svg';

const Sidebar = () => {
  return (
    <aside id="sidebar">
      <div className="drawer-list">
        <ul>
          <li>
            <NavLink to="/public" activeClassName="is-active">
              Public
            </NavLink>
          </li>
          <li>
            <NavLink to="/private" activeClassName="is-active">
              Private
            </NavLink>
          </li>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>
      </div>

      <div className="made-with">
        <h4>
          Made with
          <a href="https://reactjs.org/">
            <img src={logo} alt="logo" />
          </a>
        </h4>
      </div>
    </aside>
  );
};

export default Sidebar;
