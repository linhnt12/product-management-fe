import { Layout } from "antd";
import { Outlet, NavLink } from "react-router-dom";
import "./LayoutDefault.css";
import logo from "../../../images/logo.png";
import logoFold from "../../../images/logo-fold.png";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { getDashboard } from "../../../services/adminService";
import MenuSider from "../../../components/MenuSider";
import { getCookie } from "../../../helpers/cookie";
import avatar from "../../../images/avatar.jpg";

const { Sider, Content } = Layout;

function LayoutAdminDefault() {
  const [collapsed, setCollapsed] = useState(false);

  const token = getCookie("token");
  const [account, setAccount] = useState([]);

  // Dashboard
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getDashboard(token);
      setAccount(response.account);
    }
    fetchApi();
  }, []);
  // End Dashboard

  return (
    <>
      <Layout className="layout-default">
        <header className="header">
          <div className={"header__logo " + (collapsed && "header__logo--collapsed")}>
            <img src={collapsed ? logoFold : logo} alt="Logo" />
          </div>
          <div className="header__nav">
            <div className="header__nav-left">
              <div className="header__collapse" onClick={() => setCollapsed(!collapsed)}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </div>
            </div>

            <div className="header__nav-left">
              <NavLink to="/admin/my-account" style={{ color: "black" }}>
                <div className="account">
                  <div className="account__image">
                    <img src={avatar} />
                  </div>
                  <div className="account__fullName">
                    {account.fullName}
                  </div>
                </div>
              </NavLink>
              <NavLink to="/admin/logout" className={"adminButton"}> Logout </NavLink>
            </div>
          </div>
        </header>
        <Layout>
          <Sider width="230" style={{
            overflow: "auto",
            height: "100vh",
            position: "sticky",
            top: "56px",
            left: 0
          }} className="sider" collapsed={collapsed} theme="light">
            <MenuSider />
          </Sider>
          <Content className="content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default LayoutAdminDefault;