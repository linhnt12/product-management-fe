import { Row, Col } from "antd";
import { detailProductsCategory } from "../../../services/adminService";
import { getCookie } from "../../../helpers/cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet';

function ProductCategoryDetail() {
  const token = getCookie("token");
  const params = useParams();
  const id = params.id;

  const [productCategory, setProductCategory] = useState([]);

  // Product Category
  useEffect(() => {
    const fetchApi = async () => {
      const response = await detailProductsCategory(token, id);
      setProductCategory(response.productCategory);
    }
    fetchApi();
  }, []);
  // End Product Category


  return (
    <>
      <Helmet>
        <title>{productCategory.title}</title>
      </Helmet>
      {productCategory ?
        <>
          <div className="main main__admin">
            <Row gutter={[20, 20]}>
              <Col xs={24} sm={24} md={24} lg={15} xl={15}>
                <div className="products__header">
                  <b>{productCategory.title}</b>
                </div>
                <div className="product-admin__content__status">
                  <b>Trạng thái:</b> {productCategory.status === "active" ?
                    <div className="products__status--active">Hoạt động</div>
                    :
                    <div className="products__status--inactive">Dừng hoạt động</div>
                  }
                </div>
                <div className="product-admin__content">
                  <b>Vị trí:</b> {productCategory.position}
                </div>
                <div className="product-admin__content" >
                  <b>Mô tả:</b> {productCategory.description}
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={9} xl={9}>
                <div className='product-detail__image'>
                  <img src={productCategory.thumbnail} />
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

export default ProductCategoryDetail;