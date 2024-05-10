import { Menu } from "antd";
import { HomeOutlined, ProductOutlined, AppstoreAddOutlined, GroupOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function MenuSider() {
  const items = [
    {
      label: <Link to="/admin/dashboard">Tổng quan</Link>,
      icon: <HomeOutlined />,
      key: "/dashboard"
    },
    {
      label: <Link to="/admin/products">Danh sách sản phẩm</Link>,
      icon: <ProductOutlined />,
      key: "/products"
    },
    {
      label: <Link to="/admin/products-category">Danh mục sản phẩm</Link>,
      icon: <AppstoreAddOutlined />,
      key: "/products-category"
    }
  ];

  return (
    <>
      <Menu
        mode="inline"
        items={items}
        // defaultSelectedKeys={["/dashboard"]}
        defaultOpenKeys={["/dashboard"]}
      />
    </>
  )
}

export default MenuSider;