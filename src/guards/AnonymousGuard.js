import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import RoutesString from 'src/routes/routesString';

const AnonymousGuard = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn) return <Redirect to={RoutesString.Dashboard} />;
  return <>{children}</>;
};

export default AnonymousGuard;
