import { getCookie } from "../../../helpers/cookie";
import { useEffect, useState } from "react";
import { getDashboard } from "../../../services/adminService";
import { Card, Col, Row } from "antd";
import { Helmet } from 'react-helmet';

function Dashboard() {
  const token = getCookie("token");
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [product, setProduct] = useState([]);
  const [user, setUser] = useState([]);

  // Dashboard
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getDashboard(token);
      setCategoryProduct(response.statistic.categoryProduct);
      setProduct(response.statistic.product);
      setUser(response.statistic.user);
    }
    fetchApi();
  }, []);
  // End Dashboard

  return (
    <>
      <Helmet>
        <title>Tổng quan</title>
      </Helmet>
      <Row gutter={[20, 20]}>
        <Col span={12}>
          <Card title="Danh mục sản phẩm">
            <p>Tất cả: <strong>{categoryProduct.total}</strong></p>
            <p>Đang hoạt động: <strong>{categoryProduct.active}</strong></p>
            <p>Dừng hoạt động: <strong>{categoryProduct.inactive}</strong></p>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Sản phẩm">
            <p>Tất cả: <strong>{product.total}</strong></p>
            <p>Đang hoạt động: <strong>{product.active}</strong></p>
            <p>Dừng hoạt động: <strong>{product.inactive}</strong></p>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Tài khoản">
            <p>Tất cả: <strong>{user.total}</strong></p>
            <p>Đang hoạt động: <strong>{user.active}</strong></p>
            <p>Dừng hoạt động: <strong>{user.inactive}</strong></p>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Dashboard;