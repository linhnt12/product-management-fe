import loginImg from "../../../images/loginImg.png";
import { Col, Row } from 'antd';
import { resetPassword } from "../../../services/usersService";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../../actions/login";
import { useCookies } from 'react-cookie';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';


function ResetPassword() {
  const dispatch = useDispatch();
  const [cookie, setCookie, removeCookie] = useCookies();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = e.target[0].value;
    const confirmPassword = e.target[1].value;

    if (password != confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Xác nhận mật khẩu không khớp!"
      });
      return;
    }

    const options = {
      password: password,
      confirmPassword: confirmPassword
    }

    const response = await resetPassword(options);

    if (response.code === 200) {
      removeCookie('tokenUser', { path: '/' });
      dispatch(checkLogin(false));
      window.location.href = "/login";
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
        <title>Đặt lại mật khẩu</title>
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
                  <b>Đặt lại mật khẩu</b>
                </div>
                <label>Mật khẩu</label>
                <div>
                  <input id="password" name="password" type="password" placeholder="Nhập mật khẩu mới" required />
                </div>
                <label>Xác nhận mật khẩu</label>
                <div>
                  <input id="confirmPassword" name="confirmPassword" type="password" placeholder="Xác nhận mật khẩu" required />
                </div>
                <button type="submit">Xác nhận</button>
              </form>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default ResetPassword;