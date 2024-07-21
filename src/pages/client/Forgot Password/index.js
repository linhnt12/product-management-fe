import loginImg from "../../../images/loginImg.png";
import { Col, Row } from 'antd';
import "./ForgotPassword.scss";
import { forgotPassword } from "../../../services/usersService";
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

function ForgotPassword() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;

    const options = {
      email: email
    }

    const response = await forgotPassword(options);

    if (response.code === 200) {
      window.location.href = `/password/otp?email=${email}`;
    } else {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: response.message
      });
    }
  }
  return (
    <>
      <Helmet>
        <title>Quên mật khẩu</title>
      </Helmet>
      <div className="login-area main">
        <Row>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <div className="login-image">
              <img src={loginImg} />
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <div className="forgot-password">
              <form onSubmit={handleSubmit}>
                <div className="forgot-password__title">
                  <b>Quên mật khẩu</b>
                </div>
                <div className="forgot-password__description">
                  Nhập địa chỉ email liên kết với tài khoản của bạn.
                </div>
                <label>Email</label>
                <div>
                  <input id="email" name="email" type="email" placeholder="Nhập email" required />
                </div>
                <button type="submit">Gửi mã</button>
                <div className="if-account">
                  <p>Đã có tài khoản?</p>
                  <a href="/login">Đăng nhập</a>
                </div>
                <div className="if-account">
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

export default ForgotPassword;