import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { USER_ROLE } from 'src/constants/enums';

import RoutesString from './routesString';

const RoleRoute = ({ children, requireRoles = [] }) => {
  const history = useHistory();
  const user = useSelector((state) => state.auth.user);
  const role = user?.role || '';

  useEffect(() => {
    if (!role || requireRoles.length === 0) return;

    const checkRole = requireRoles.includes(role);

    if (!checkRole) {
      history.replace(RoutesString.Error404);
    }
  }, [history, role, requireRoles]);

  return <>{children}</>;
};

export default RoleRoute;
