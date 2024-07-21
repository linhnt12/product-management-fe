import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getOrder } from "../../../services/productsService";
import CheckCircle from "../../../images/CheckCircle.png";
import { Col, Row } from "antd";
import CheckoutItem from "./CheckoutItem";
import "./CheckoutSuccess.scss";
import { Helmet } from 'react-helmet';


function CheckoutSucess() {
  const [order, setOrder] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsInfo, setProductsInfo] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const params = useParams();
  const id = params.orderId;

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getOrder(id);
      setUserInfo(response.order.userInfo);
      setTotalPrice(response.totalPrice);
      setProducts(response.order.products);
      setProductsInfo(response.productInfo);
      setOrder(response.order);
    }
    fetchApi();
  }, []);

  products?.map(item => {
    productsInfo?.map(product => {
      if (item.product_id === product._id) {
        item.thumbnail = product.thumbnail;
        item.title = product.title;
      }
    })
  });

  const createdAt = new Date(order.createdAt);

  return (
    <>
    <Helmet>
        <title>Thanh toán thành công</title>
      </Helmet>
      <div className="main order-success">
        <div className="order-success__noti">
          <div className="order-success__image">
            <img src={CheckCircle} />
          </div>
          <div className="order-success__title">
            <b>Đặt hàng thành công!</b>
          </div>
          <div className="order-success__message">
            Chúc mừng bạn đã đặt hàng thành công! Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất.
          </div>
        </div>
        <div className="order-success__order-info">
          <Row>
            <Col xs={24} sm={24} md={24} lg={14} xl={14}>
              <div className="order-success__info-title">
                <b>Thông tin đặt hàng</b>
              </div>
              <table className="table-info">
                <tr>
                  <td><b>Họ tên</b></td>
                  <td>{userInfo.fullName}</td>
                </tr>
                <tr>
                  <td><b>Số điện thoại</b></td>
                  <td>{userInfo.phone}</td>
                </tr>
                <tr>
                  <td><b>Địa chỉ</b></td>
                  <td>{userInfo.address}</td>
                </tr>
                <tr>
                  <td><b>Ngày đặt hàng</b></td>
                  <td>{createdAt?.toLocaleString('en-GB').split(",")[0]}</td>
                </tr>
              </table>
            </Col>
            <Col xs={24} sm={24} md={24} lg={10} xl={10}>
              <div className="checkout__cart">
                <div className="checkout__cart__title"><b>PRODUCT</b></div>
                {products?.map(item => (
                  <CheckoutItem item={item} key={item._id} />
                ))}
                <div className="checkout__cart__fee">
                  <div className="title">Phí vận chuyển:</div>
                  <div className="value" style={{ color: "#f1352b" }}><b>+ {(parseInt(30000)).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</b></div>
                </div>
                <div className="checkout__cart__fee">
                  <div className="total-title"><b>Tổng đơn hàng</b></div>
                  <div className="total-value"><b>{((parseInt(totalPrice + 30000)).toLocaleString('it-IT', {style : 'currency', currency : 'VND'}))}</b></div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default CheckoutSucess;