import React, { ReactNode, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserProps } from '../pages/admin/admin-manage-user/AdminManageUser';
import AuthContext from '../context/AuthContext';

type ProtectedRouteProps = {
  redirectPath?: string;
  children?: ReactNode;
};
// export const ProtectedRoute = {};
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = '/admin/login',
  children,
}) => {
  const authContext = useContext(AuthContext);
  if (!authContext || authContext.userLogin.userToken === null) {
    return <Navigate to={redirectPath} replace={true} />;
  }

  return children ? <>{children}</> : <Outlet />;
};
