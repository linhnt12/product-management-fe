import { Row, Col } from "antd";
import { detailProduct } from "../../../services/adminService";
import { getCookie } from "../../../helpers/cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetailAdmin.scss";
import { Helmet } from 'react-helmet';

function ProductDetailAdmin() {
  const token = getCookie("token");
  const params = useParams();
  const id = params.id;

  const [product, setProduct] = useState([]);

  // Product
  useEffect(() => {
    const fetchApi = async () => {
      const response = await detailProduct(token, id);
      setProduct(response.products);
    }
    fetchApi();
  }, []);
  // End Product

  return (
    <>
      <Helmet>
        <title>{product.title}</title>
      </Helmet>
      {product ?
        <>
          <div className="main main__admin">
            <Row gutter={[20, 20]}>
              <Col xs={24} sm={24} md={24} lg={15} xl={15}>
                <div className="products__header">
                  <b>{product.title}</b>
                </div>
                <div className="product-admin__content">
                  <b>Giá:</b> {
                  (parseInt(product.price)).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                </div>
                <div className="product-admin__content">
                  <b>Giảm giá:</b> {product.discountPercentage}%
                </div>
                <div className="product-admin__content">
                  <b>Còn lại:</b> {product.stock} sản phẩm
                </div>
                <div className="product-admin__content__status">
                  <div className="product-admin__content__title">
                    <b>Trạng thái:</b>
                  </div>
                  {product.status === "active" ?
                    <div className="products__status--active">Hoạt động</div>
                    :
                    <div className="products__status--inactive">Dừng hoạt động</div>
                  }
                </div>
                <div className="product-admin__content">
                  <b>Vị trí:</b> {product.position}
                </div>
                <div className="product-admin__content" >
                  <b>Mô tả:</b> {product.description}
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={9} xl={9}>
                <div className='product-detail__image'>
                  <img src={product.thumbnail} />
                </div>
              </Col>
            </Row>
          </div >
        </>
        : <></>
      }
    </>
  )
}

export default ProductDetailAdmin;