import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';

import { logout } from '../../app/app.slice';

const Home = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h1>Home Page</h1>
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Home;
