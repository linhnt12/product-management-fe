import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCookie } from "../../helpers/cookie";


function PrivateRoutes() {
  const isLogin = useSelector(state => state.loginReducer);
  return (
    <>
      {isLogin ? (<Outlet />) : (<Navigate to="/login" />)}
    </>
  )
}

export default PrivateRoutes;