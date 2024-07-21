import { useNavigate, useParams } from 'react-router-dom';
import { home, getCategory } from '../../../services/productsService';
import { useEffect, useRef, useState } from "react";
import { Row, Col } from "antd";
import ProductItem from "../Products/ProductItem";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { treeCategory } from '../../../helpers/treeCategory';
import "./Category.scss";
import { formatTitle } from '../../../helpers/formatTitle';
import { Helmet } from 'react-helmet';

function Category() {
  const params = useParams();
  const slug = params.slugCategory;
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [productsCategory, setProductsCategory] = useState([]);
  const subCategory = useRef([]);
  const [category, setCategory] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [totalProducts, setTotalProducts] = useState([]);
  const currentPage = useRef(1);
  const options = useRef({});

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getCategory(slug);
      if (response.code === 200) {
        setProducts(response.products);
        setCategory(response.category);
        setPagination(response.pagination);
        setTotalProducts(response.countProducts);
      }
      else {
        navigate("/404");
        return;
      }
    }
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await home();
      setProductsCategory(response.productsCategory);
    }
    fetchApi();
  }, []);

  const parentCategory = treeCategory(productsCategory);

  parentCategory.map(item => {
    if (item.slug == slug) {
      subCategory.current = item.children;
    }
  });

  // Sort
  const handleChange = async (e) => {
    e.preventDefault();

    if (e.target.value == "") {
      const response = await getCategory(slug);
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

      const response = await getCategory(slug, options.current);
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
    const response = await getCategory(slug, options.current);
    setProducts(response.products);
  }

  const handlePrev = async (e) => {
    if (currentPage.current > 1) {
      currentPage.current = currentPage.current - 1;
      options.current = {
        ...options.current,
        page: `${currentPage.current}`
      }
      const response = await getCategory(slug, options.current);
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
      const response = await getCategory(slug, options.current);
      setProducts(response.products);
    }
  }
  // End Pagination

  return (
    <>
      <Helmet>
        <title>{category.title}</title>
      </Helmet>
      <div className="products main">
        {subCategory.current.length > 0 ?
          <>
            <b className='product__title'>Hãng</b>
            <div className='products__brand'>
              {(subCategory.current)?.map(item => (
                <div className='products__brand__item'>
                  <a href={`/${item.slug}`}>{(item.title).split(" ").pop()}</a>
                </div>
              ))}
            </div>
          </>
          : <></>}
        <div className='products__header'>
          <b>{totalProducts + " " + (category.title ? formatTitle(category.title) : "")} { }</b>
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
            <Col xs={12} sm={8} md={8} lg={4} xl={4} key={item.id}>
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
export default Category;