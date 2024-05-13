import { Col, Row } from "antd";
import "./Checkout.scss";
import { useEffect, useState } from "react";
import { checkoutOrder, getCart } from '../../../services/productsService';
import CheckoutItem from "./CheckoutItem";
import { Helmet } from 'react-helmet';

function Checkout() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  let totalQuantity = 0;

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getCart();
      setProducts(response.productsInfo);
      setCart(response.cart);
      setTotalPrice(response.totalPrice);
    }
    fetchApi();
  }, []);

  cart.products?.map(item => {
    totalQuantity += item.quantity;
    products.map(product => {
      if (item.product_id === product._id) {
        product.quantity = item.quantity;
      }
    })
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const fullName = e.target[0].value;
    const phone = e.target[1].value;
    const address = e.target[2].value;

    const options = {
      fullName: fullName,
      phone: phone,
      address: address
    }

    const fetchApi = async () => {
      const response = await checkoutOrder(options);
      window.location.href = `/checkout/success/${response.order._id}`;
    }
    fetchApi();
  }

  return (
    <>
    <Helmet>
        <title>Thanh toán</title>
      </Helmet>
      <div className="main checkout">
        <div className="checkout__title"><b>THANH TOÁN</b></div>
        <Row>
          <Col xs={24} sm={24} md={24} lg={15} xl={15}>
            <div className="checkout__user-info">
              <form className="form-info" onSubmit={handleSubmit}>
                <label name="fullName">Họ và tên</label>
                <input type="text" name="fullName" id="fullName" required></input>
                <label name="phone">Số điện thoại</label>
                <input type="text" name="phone" id="phone" required></input>
                <label name="address">Địa chỉ</label>
                <input type="text" name="address" id="address" required></input>
                <div className="button-out">
                  <button className="button-order" type="submit"><b>Đặt hàng</b></button>
                </div>
              </form>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={9} xl={9}>
            <div className="checkout__cart">
              <div className="checkout__cart__title"><b>PRODUCT</b></div>
              {products?.map(item => (
                <CheckoutItem item={item} key={item._id} />
              ))}
              <div className="checkout__cart__fee">
                <div className="title">Phí vận chuyển:</div>
                <div className="value" style={{color: "#f1352b"}}><b>+ {(parseInt(30000)).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</b></div>
              </div>
              <div className="checkout__cart__fee">
                <div className="total-title"><b>Tổng đơn hàng</b></div>
                <div className="total-value"><b>{((parseInt(totalPrice + 30000)).toLocaleString('it-IT', {style : 'currency', currency : 'VND'}))}</b></div>
              </div>
            </div>
          </Col>
        </Row>
      </div>

    </>
  )
}

export default Checkout;