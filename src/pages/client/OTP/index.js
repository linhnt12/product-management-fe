import loginImg from "../../../images/loginImg.png";
import { Col, Row } from 'antd';
import { otpVerify } from "../../../services/usersService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../../actions/login";
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

function OTP() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const search = window.location.search;
  const query = new URLSearchParams(search);
  const email = query.get('email');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const otp = e.target[1].value;

    const options = {
      email: email,
      otp: otp
    }
    
    const response = await otpVerify(options);

    if (response.code === 200) {
      dispatch(checkLogin(true));
      navigate("/user/password/reset");
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
                  <b>Xác nhận email</b>
                </div>
                <div className="forgot-password__description">
                  Nhập mã OTP đã được gửi về email của bạn.
                </div>
                <label>Email</label>
                <div>
                  <input id="email" name="email" type="email" placeholder="Nhập email" required value={email} readOnly/>
                </div>
                <label>Mã OTP</label>
                <div>
                  <input id="otp" name="otp" type="text" placeholder="Nhập mã OTP" required/>
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

export default OTP;