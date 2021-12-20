import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import RoutesString from 'src/routes/routesString';

const AuthGuard = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log('isLoggedIn', isLoggedIn);
  if (!isLoggedIn) return <Redirect to={RoutesString.Login} />;
  return <>{children}</>;
};

export default AuthGuard;
