import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col } from "antd";
import { useEffect, useState } from "react";
import { addToCart, getProductDetail } from '../../../services/productsService';
import "./ProductDetail.scss";
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

function ProductDetail() {
  const params = useParams();
  const slug = params.slugProduct;
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);

  const newPrice = (product.price * (100 - product.discountPercentage) / 100).toFixed();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getProductDetail(slug);
      if (response.code === 200) {
        setProduct(response.product);
      }
      else {
        navigate("/404");
        return;
      }
    }
    fetchApi();
  }, []);

  const handleAddToCart = (e) => {
    e.preventDefault();
    const quantity = e.target[0].value;
    const id = product._id;
    const slug = product.slug;

    const options = {
      quantity: quantity
    }

    const fetchApi = async () => {
      const response = await addToCart(id, options);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Đã thêm sản phẩm vào giỏ hàng!",
        showConfirmButton: true,
        timer: 1500
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(0);
        }
      });
    }
    fetchApi();
  }

  const handleAdd = () => {
    const id = product._id;
    const inputsQuantity = document.querySelectorAll(`input[id='quantity${id}']`);
    const value = parseInt(inputsQuantity[0].value);
    inputsQuantity[0].value = value + 1;
  }

  const handleMinus = () => {
    const id = product._id;
    const inputsQuantity = document.querySelectorAll(`input[id='quantity${id}']`);
    const value = parseInt(inputsQuantity[0].value);
    if (value > 1) {
      inputsQuantity[0].value = value - 1;
    }
  }

  return (
    <>
     <Helmet>
        <title>{product.title}</title>
      </Helmet>
      {product ?
        <>
          <div className="product-detail main">
            <Row gutter={[20, 20]}>
              <Col xs={24} sm={24} md={24} lg={15} xl={15}>
                <div className='product-detail__image'>
                  <img src={product.thumbnail} />
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={9} xl={9}>
                <div className='product-detail__content'>
                  <div className='product-detail__title'>
                    {product.title}
                  </div>
                  <div className='product-detail__price'>
                    <div className='product-detail__price-new'>
                    {(parseInt(newPrice)).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                    </div>
                    <div className='product-detail__attr'>
                      <div className="product-detail__price-old">
                        {(parseInt(product.price)).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                      </div>
                      {product.discountPercentage ? <div className="product-detail__percent">
                        Giảm {product.discountPercentage}%
                      </div> : <></>}
                    </div>
                  </div>
                  <div className="product-detail__stock">
                    <p><b>Tình trạng:</b></p>
                    {product.stock ? <p className='product-detail__stock--active'>Còn hàng</p> : <p className='product-detail__stock--inactive'>Tạm hết hàng</p>}
                  </div>
                </div>
                <div className='product-detail__addToCart'>
                  <form className='form-addCart' onSubmit={handleAddToCart}>
                    <div className='product-detail__quantity'>
                      <span className="minus" onClick={handleMinus}>-</span>
                      <input id={`quantity${product._id}`} name="quantity" defaultValue={1} min={1} max={product.stock} />
                      <span className="add" onClick={handleAdd}>+</span>
                    </div>
                    <button className='button' type='submit'><b>THÊM VÀO GIỎ HÀNG</b></button>
                  </form>
                </div>
              </Col>
            </Row>
          </div >
          <div className='main'>
            <div className='description__title'>
              <b>Mô tả sản phẩm</b>
            </div>
            <div className='description__content' dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        </>
        : <></>
      }
    </>
  )
}

export default ProductDetail;