import { useNavigate } from "react-router-dom";
import { deleteCookie } from "../../../helpers/cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../../actions/login";
import { useCookies } from 'react-cookie';

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies();

  deleteCookie("tokenUser");

  useEffect(() => {
    removeCookie('tokenUser',{path:'/'});
    dispatch(checkLogin(false));
    navigate("/");
  }, [])

  return (
    <>
    </>
  )
}

export default Logout;