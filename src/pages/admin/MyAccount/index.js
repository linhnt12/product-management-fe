import { getCookie } from "../../../helpers/cookie";
import { useEffect, useState } from "react";
import { editMyAccount, getMyAccount } from "../../../services/adminService";
import avatar from "../../../images/avatar.jpg";
import "./MyAccount.scss";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router";
import { Helmet } from 'react-helmet';


function MyAccount() {
  const token = getCookie("token");
  const [account, setAccount] = useState([]);
  const navigate = useNavigate();

  // My Account
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getMyAccount(token);
      setAccount(response.account);
    }
    fetchApi();
  }, []);
  // End My Account

  const createdAt = new Date(account.createdAt);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      fullName: e.target[0].value,
      email: e.target[1].value,
      phone: e.target[2].value
    }

    const response = await editMyAccount(token, options);
    Swal.fire({
      position: "center",
      icon: "success",
      title: response.message,
      showConfirmButton: true,
      timer: 1500
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(0);
      }
    });
  }

  return (
    <>
      <Helmet>
        <title>Thông tin tài khoản</title>
      </Helmet>
      <div className="main main__admin info">
        <div className="info__title"><b>Thông tin tài khoản</b></div>
        <div className="info__avatar">
          <img src={avatar} />
        </div>
        <form className="form-info" onSubmit={handleSubmit}>
          <label name="fullName">Họ và tên</label>
          <input type="text" name="fullName" id="fullName" defaultValue={account.fullName} required></input>
          <label name="email">Email</label>
          <input name="email" type="email" id="email" required defaultValue={account.email}></input>
          <label name="phone">Số điện thoại</label>
          <input name="phone" type="text" id="phone" required defaultValue={account.phone}></input>
          <label name="createdAt">Ngày tham gia</label>
          <input name="createdAt" type="text" id="createdAt" readOnly value={createdAt?.toLocaleString('en-GB').split(",")[0]}></input>
          <button className="adminButton" type="submit">Cập nhật</button>
        </form>
      </div>
    </>
  )
}

export default MyAccount;