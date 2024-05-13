import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { getSearchResult } from "../../../services/productsService";
import ProductItem from "../Products/ProductItem";
import { Helmet } from 'react-helmet';

function Search() {
  const search = window.location.search;
  const query = new URLSearchParams(search);
  const keyword = query.get('keyword');

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getSearchResult(keyword);
      setProducts(response.products);
    }
    fetchApi();
  }, []);

  return (
    <>
      <Helmet>
        <title>Kết quả tìm kiếm</title>
      </Helmet>
      <div className="products main">
        <h2>{products.length} kết quả cho '{keyword}'</h2>
        <Row gutter={[20, 20]}>
          {products?.map(item => (
            <Col xs={12} sm={8} md={8} lg={4} xl={4} key={item.id}>
              <ProductItem item={item} />
            </Col>
          ))}
        </Row>
      </div>
    </>
  )
}

export default Search;