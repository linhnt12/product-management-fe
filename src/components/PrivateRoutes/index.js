import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCookie } from "../../helpers/cookie";


function PrivateRoutes() {
  var isLogin = useSelector(state => state.loginReducer);
  const tokenUser = getCookie("tokenUser");
  if (tokenUser) {
    isLogin = true;
  }
  return (
    <>
      {isLogin ? (<Outlet />) : (<Navigate to="/login" />)}
    </>
  )
}

export default PrivateRoutes;