import { Navigate, Outlet } from "react-router-dom";

const RouteProtection = ({
  username,
  redirecTo = "/auth_user",
}) => {
  if ( !username) {
    return <Navigate to={redirecTo} />;
  }

  return <Outlet/>;
};

export default RouteProtection;
