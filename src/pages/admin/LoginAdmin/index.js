import { useNavigate } from "react-router-dom";
import logo from "../../../images/logo.png";
import { login } from "../../../services/adminService";
import "./LoginAdmin.scss";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../../actions/login";
import { setCookie } from "../../../helpers/cookie";
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

function LoginAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value
    
    const options = {
      email: email,
      password: password
    }

    const response = await login(options);

    if (response.code == 200) {
      setCookie("token", response.token, 1);
      dispatch(checkLogin(true));
      navigate("/admin/dashboard");
    } else {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Sai tài khoản hoặc mật khẩu!"
      });
    }
  }
  return (
    <>
    <Helmet>
        <title>Đăng nhập Admin</title>
      </Helmet>
      <header className="header">
        <div className={"header__logo "}>
          <img src={logo} alt="Logo" />
        </div>
      </header>
      <div className="login-admin-area">
        <div className="login-admin-form">
          <form onSubmit={handleSubmit}>
            <div className="login-admin-title"><b>Đăng Nhập</b></div>
            <label>Email</label>
            <div>
              <input id="email" name="email" type="email" placeholder="Nhập email" />
            </div>
            <label>Mật khẩu</label>
            <div>
              <input id="password" name="password" type="password" placeholder="Nhập mật khẩu" />
            </div>
            <button className="button-login-admin" type="submit">Đăng nhập</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginAdmin;
