import { Row, Col } from "antd";
import { useEffect, useRef, useState } from "react";
import { getProducts, home } from "../../../services/productsService";
import ProductItem from "../Products/ProductItem";
import CategoryItem from "..//Category/CategoryItem";
import "./Home.scss";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';

function Home() {
  const [products, setProducts] = useState([]);
  const [productsNew, setProductsNew] = useState([]);
  const [productsCategory, setProductsCategory] = useState([]);
  const [pagination, setPagination] = useState([]);
  const currentPage = useRef(1);
  const options = useRef({});

  // New Products
  useEffect(() => {
    const fetchApi = async () => {
      const response = await home();
      setProductsNew(response.productsNew);
      setProductsCategory(response.productsCategory);
    }
    fetchApi();
  }, []);
  // End New Products

  // Get Products
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getProducts();
      setProducts(response.products);
      setPagination(response.pagination);
    }
    fetchApi();
  }, []);
  // End Get Products

  // Sort
  const handleChange = async (e) => {
    e.preventDefault();

    if (e.target.value == "") {
      const response = await getProducts();
      setProducts(response.products);
      options.current = {
        ...options.current,
        sortKey: ``,
        sortValue: ``
      }
    } else {
      const sortKey = e.target.value.split('&')[0];
      const sortValue = e.target.value.split('&')[1];

      options.current = {
        ...options.current,
        sortKey: `${sortKey.split('=')[1]}`,
        sortValue: `${sortValue.split('=')[1]}`,
      }

      const response = await getProducts(options.current);
      setProducts(response.products);
    }
  }
  // End Sort

  // Pagination
  const handleClick = async (e) => {
    currentPage.current = parseInt(e.target.textContent);

    options.current = {
      ...options.current,
      page: `${currentPage.current}`
    }
    const response = await getProducts(options.current);
    setProducts(response.products);
  }

  const handlePrev = async (e) => {
    if (currentPage.current > 1) {
      currentPage.current = currentPage.current - 1;
      options.current = {
        ...options.current,
        page: `${currentPage.current}`
      }
      const response = await getProducts(options.current);
      setProducts(response.products);
    }
  }

  const handleNext = async (e) => {
    if (currentPage.current < pagination.totalPage) {
      currentPage.current = currentPage.current + 1;
      options.current = {
        ...options.current,
        page: `${currentPage.current}`
      }
      const response = await getProducts(options.current);
      setProducts(response.products);
    }
  }
  // End Pagination

  return (
    <>
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <div className="productsCategory main">
        <h2>DANH MỤC SẢN PHẨM</h2>
        <Row gutter={[20, 20]}>
          {productsCategory?.map(item => (
            (!item.parent_id ?
              <Col xs={6} sm={6} md={6} lg={3} xl={3}>
                <CategoryItem item={item} key={item._id} />
              </Col> : <></>)
          ))}
        </Row>
      </div>

      <div className="productsNew main">
        <h2>SẢN PHẨM MỚI</h2>
        <Row gutter={[20, 20]}>
          {productsNew?.map(item => (
            <Col xs={12} sm={8} md={8} lg={4} xl={4}>
              <ProductItem item={item} key={item._id} />
            </Col>
          ))}
        </Row>
      </div>

      <div className="products main">
        <div className="products__header">
          <h2 style={{ fontSize: "21px" }}>TOÀN BỘ SẢN PHẨM</h2>
          <div className="sort">
            <select className="select-sort" defaultValue={""} onChange={handleChange}>
              <option value={""}>Mới nhất</option>
              <option value={"sortKey=discountPercentage&sortValue=desc"}>Giảm giá nhiều</option>
              <option value={"sortKey=price&sortValue=desc"}>Giá cao đến thấp</option>
              <option value={"sortKey=price&sortValue=asc"}>Giá thấp đến cao</option>
            </select>
          </div>
        </div>
        <Row gutter={[20, 20]}>
          {products?.map(item => (
            <Col xs={12} sm={8} md={8} lg={4} xl={4}>
              <ProductItem item={item} key={item._id} />
            </Col>
          ))}
        </Row>
        <div className="pagination">
          <div className="pagination__prev" onClick={handlePrev}><LeftOutlined /></div>
          {(() => {
            const arr = [];
            for (let i = 1; i <= pagination.totalPage; i++) {
              arr.push(
                <div className={"pagination__index" + ((currentPage.current == i) ? "--active" : "")} onClick={handleClick}>
                  {i}
                </div>
              );
            }
            return arr;
          })()}
          <div className="pagination__next" onClick={handleNext}><RightOutlined /></div>
        </div>
      </div>
    </>
  )
}

export default Home;