import { Navigate, Outlet } from "react-router-dom";

const RouteProtection = ({
  user,
  username,
  children,
  redirecTo = "/auth_user",
}) => {
  if ( !username) {
    return <Navigate to={redirecTo} />;
  }

  return <Outlet/>;
};

export default RouteProtection;
