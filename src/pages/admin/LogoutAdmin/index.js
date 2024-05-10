import { useNavigate } from "react-router-dom";
import { deleteCookie } from "../../../helpers/cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../../actions/login";
import { useCookies } from 'react-cookie';

function LogoutAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies();

  deleteCookie("token");

  useEffect(() => {
    removeCookie('token',{path:'/'});
    dispatch(checkLogin(false));
    navigate("/admin/auth/login");
  }, [])

  return (
    <>
    </>
  )
}

export default LogoutAdmin;