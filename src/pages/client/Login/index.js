import loginImg from "../../../images/loginImg.png";
import { Col, Row } from 'antd';
import "./login.scss";
import { login } from "../../../services/usersService";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../../helpers/cookie";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../../actions/login";
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    const options = {
      email: email,
      password: password
    }

    const response = await login(options);

    if (response.code == 200) {
      setCookie("tokenUser", response.tokenUser, 1);
      dispatch(checkLogin(true));
      navigate("/");
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
        <title>Đăng nhập</title>
      </Helmet>
      <div className="login-area main">
        <Row>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <div className="login-image">
              <img src={loginImg} />
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <div className="login-form">
              <form onSubmit={handleSubmit}>
                <h2>Đăng Nhập</h2>
                <label>Email</label>
                <div>
                  <input id="email" name="email" type="email" placeholder="Nhập email" />
                </div>
                <label>Mật khẩu</label>
                <div>
                  <input id="password" name="password" type="password" placeholder="Nhập mật khẩu" />
                </div>
                <a href="/password/forgot" style={{ display: "block" }}>Quên mật khẩu?</a>
                <button type="submit">Đăng nhập</button>
                <div className="register">
                  <p>Chưa có tài khoản?</p>
                  <a href="/register">Đăng ký</a>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Login;