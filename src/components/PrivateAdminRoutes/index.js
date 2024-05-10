import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCookie } from "../../helpers/cookie";


function PrivateAdminRoutes() {
  var isLogin = useSelector(state => state.loginReducer);
  const token = getCookie("token");
  if (token) {
    isLogin = true;
  }
  return (
    <>
      {isLogin ? (<Outlet />) : (<Navigate to="/admin/auth/login" />)}
    </>
  )
}

export default PrivateAdminRoutes;