import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCart, home } from "../../../../services/productsService";
import "./LayoutDefault.scss";
import logo from "../../../../images/logo.png";
import { UserOutlined, ShoppingCartOutlined, TruckOutlined, ExclamationCircleOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { Col, Menu, Row } from "antd";
import { getCookie } from "../../../../helpers/cookie";
import { useSelector } from "react-redux";
import { treeCategory } from "../../../../helpers/treeCategory";


function LayoutDefault() {
  const tokenUser = getCookie("tokenUser");
  var isLogin = useSelector(state => state.loginReducer);

  const search = window.location.search;
  const query = new URLSearchParams(search);
  const keyword = query.get('keyword');

  const [productsCategory, setProductsCategory] = useState([]);
  const [cart, setCart] = useState([]);
  let totalQuantity = 0;

  useEffect(() => {
    const fetchApi = async () => {
      const response = await home();
      setProductsCategory(response.productsCategory);
    }
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getCart();
      setCart(response.cart);
    }
    fetchApi();
  }, []);

  const handleChange = (e) => {
    const slugCategory = e.target.value;

    if (slugCategory != "") {
      window.location.href = `/${slugCategory}`;
    }
  }

  cart.products?.map(item => {
    totalQuantity += item.quantity;
  })

  // Tree Category
  const parentCategory = treeCategory(productsCategory);
  // Tree Category

  return (
    <>
      <div className="layout-default">
        <Row justify="center">
          <Col xs={24} sm={24} md={24} lg={24} xl={17}>
            <header className="layout-default__header">
              <div className="layout-default__logo">
                <a href="/">
                  <img src={logo} href="/" alt="logo" />
                </a>
              </div>
              <form action="/search"
                method="GET"
                className="form-search">
                <input defaultValue={keyword} type="text" name='keyword' placeholder="Bạn tìm gì..." />
                <button type="submit">Tìm kiếm</button>
              </form>

              <div className="layout-default__account">
                <div className="cart-area">
                  <NavLink to="/cart"> <ShoppingCartOutlined /> </NavLink>
                  <div className="cart-area__quantity">
                    {totalQuantity < 10 ? <b>{totalQuantity}</b> :
                      <b>10+</b>
                    }
                  </div>
                </div>
                {!tokenUser ?
                  <NavLink to="/login"> <UserOutlined /> </NavLink>
                  :
                  <NavLink to="/user/info"> <UserOutlined /> </NavLink>}
                {!tokenUser ?
                  <div className="login-register">
                    <NavLink to="/login" className={"text"}> Login</NavLink>
                    /
                    <NavLink to="/register" className={"text"}> Register</NavLink>
                  </div>
                  : <NavLink to="/logout" className={"text login-register"}> Logout </NavLink>}
              </div>
            </header>

            <div className="layout-default__nav">
              <div className="layout-default__nav__left">
                <select onChange={handleChange} className="select-category">
                  <option key="" value="">Tất cả danh mục</option>
                  {productsCategory.map(item =>
                  (!item.parent_id ?
                    <option key={item.slug} value={item.slug}>{item.title}</option>
                    : <></>)
                  )}
                </select>
              </div>

              <div className="layout-default__nav__right">
                <NavLink to="#">
                  <TruckOutlined />
                  <p>Theo dõi đơn hàng</p>
                </NavLink>
                <NavLink to="#">
                  <CustomerServiceOutlined />
                  <p>Tư vấn</p>
                </NavLink>
                <NavLink to="#">
                  <ExclamationCircleOutlined />
                  <p>Hỗ trợ</p>
                </NavLink>
              </div>
            </div>

            <Outlet />

          </Col>
        </Row>
        <footer className="layout-default__footer">
          Copyright
        </footer>
      </div>
    </>
  )
}

export default LayoutDefault;