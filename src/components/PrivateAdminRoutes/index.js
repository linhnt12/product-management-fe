import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCookie } from "../../helpers/cookie";


function PrivateAdminRoutes() {
  const isLogin = useSelector(state => state.loginReducer);
  const token = getCookie("token");
  return (
    <>
      {token ? (<Outlet />) : (<Navigate to="/admin/auth/login" />)}
    </>
  )
}

export default PrivateAdminRoutes;