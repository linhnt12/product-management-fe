import loginImg from "../../../images/loginImg.png";
import { Col, Row } from 'antd';
import "../Login/login.scss";
import { register } from "../../../services/usersService";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../../helpers/cookie";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../../actions/login";
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const passwordConfirm = e.target[3].value;

    if (passwordConfirm === password) {
      const options = {
        fullName: fullName,
        email: email,
        password: password
      }

      const response = await register(options);

      if (response.code == 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Đăng ký thành công!",
          showConfirmButton: true,
          timer: 1500
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: response.message
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Xác nhận mật khẩu không khớp!"
      });
    }
  }

  return (
    <>
      <Helmet>
        <title>Đăng ký</title>
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
                <h2>Đăng Ký</h2>
                <label>Họ và tên</label>
                <div>
                  <input id="fullName" name="fullName" type="text" required />
                </div>
                <label>Email</label>
                <div>
                  <input id="email" name="email" type="email" required />
                </div>
                <label>Mật khẩu</label>
                <div>
                  <input id="password" name="password" type="password" required />
                </div>
                <label>Xác nhận mật khẩu</label>
                <div>
                  <input id="password-confim" name="password-confirm" type="password" required />
                </div>
                <button type="submit">Đăng ký</button>
                <div className="register">
                  <p>Đã có tài khoản?</p>
                  <a href="/login">Đăng nhập</a>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Register;