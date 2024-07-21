import { useEffect, useState } from "react";
import { API_DOMAIN } from "../../../utils/request";
import { getCookie } from "../../../helpers/cookie";
import "./UserInfo.scss";
import { useSelector } from "react-redux";
import { Helmet } from 'react-helmet';

function UserInfo() {
  const isLogin = useSelector(state => state.loginReducer);

  const [info, setInfo] = useState([]);
  const tokenUser = getCookie("tokenUser");

  useEffect(() => {
    fetch(API_DOMAIN + 'user/info', {
      headers: { Authorization: `Bearer ${tokenUser}` },
      withCredntials: true,
      credentials: 'include'
    })
      .then(response => response.json())
      .then(json => setInfo(json.user));
  }, []);

  const createdAt = new Date(info.createdAt);

  return (
    <>
      <Helmet>
        <title>Thông tin tài khoản</title>
      </Helmet>
      <div className="main info">
        <div className="info__title"><b>Thông tin tài khoản</b></div>
        <form className="form-info">
          <label name="fullName">Họ và tên</label>
          <input type="text" name="fullName" id="fullName" defaultValue={info.fullName} required></input>
          <label name="email">Email</label>
          <input name="email" type="email" id="email" required defaultValue={info.email}></input>
          <label name="createdAt">Ngày tham gia</label>
          <input name="createdAt" type="text" id="createdAt" readOnly value={createdAt?.toLocaleString('en-GB').split(",")[0]}></input>
        </form>
      </div>
    </>
  )
}

export default UserInfo;