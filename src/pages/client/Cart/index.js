import { Col, Row } from 'antd';
import { useEffect, useState } from "react";
import { getCart } from '../../../services/productsService';
import CartItem from './CartItem';
import "./Cart.scss";
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';

function Cart() {
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

  (cart?.products)?.map(item => {
    totalQuantity += item.quantity;
    products.map(product => {
      if (item.product_id === product._id) {
        product.quantity = item.quantity;
      }
    })
  })

  return (
    <>
    <Helmet>
        <title>Giỏ hàng</title>
      </Helmet>
      <div className="main cart">
        {products.length > 0 ?
          <Row>
            <Col xs={24} sm={24} md={24} lg={16} xl={16}>
              {products?.map(item => (
                <CartItem item={item} key={item._id} />
              ))}
            </Col>
            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
              <div className='order'>
                <div className='order__title'>Đơn hàng</div>
                <div className='order__list'>
                  <div className='order__list__title'>Số lượng sản phẩm:</div>
                  <div className='order__list__value'><b>{totalQuantity}</b></div>
                </div>
                <div className='order__list'>
                  <div className='order__list__title'>Phí giao hàng:</div>
                  <div className='order__list__value'>{totalQuantity ? <b>{(parseInt(30000)).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</b> : <b>0₫</b>}</div>
                </div>
                <div className='order__totalPrice'>
                  <div className='order__totalPrice__title'><b>Tổng thanh toán:</b></div>
                  <div className='order__totalPrice__value'><b>{totalQuantity ? ((parseInt(totalPrice + 30000)).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})) : 0} </b></div>
                </div>
                <div className='button-out'>
                  <a href="/checkout">
                    <button className='button-checkout'><b>Thanh toán</b></button>
                  </a>
                </div>

              </div>
            </Col>
          </Row> :
          <div className='empty-cart'>
            <p><b>Không có sản phẩm nào</b></p>
            <a href="/">
              <div className='empty-cart__button'>
                <div className='empty-cart__icon'>
                  <ShoppingCartOutlined />
                </div>
                Tiếp tục mua sắm
              </div>
            </a>
          </div>}

      </div>
    </>
  )
}

export default Cart;