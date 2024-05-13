import { getProductsCategory } from "../../../services/adminService";
import { getCookie } from "../../../helpers/cookie";
import { useEffect, useState, useRef } from "react";
import { LeftOutlined, RightOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { treeCategory } from "../../../helpers/treeCategory";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

function ProductsCategory() {
  const token = getCookie("token");
  const [productsCategory, setProductsCategory] = useState([]);
  const [pagination, setPagination] = useState([]);
  const currentPage = useRef(1);
  const options = useRef({});
  const status = useRef("");
  const navigate = useNavigate();

  // Products Category
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getProductsCategory(token);
      setProductsCategory(response.productsCategory);
      setPagination(response.pagination);
    }
    fetchApi();
  }, []);
  // End Products Category

  // Sort
  const handleChange = async (e) => {
    e.preventDefault();

    if (e.target.value == "") {
      const response = await getProductsCategory(token);
      setProductsCategory(response.productsCategory);
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

      const response = await getProductsCategory(token, options.current);
      setProductsCategory(response.productsCategory);
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
    const response = await getProductsCategory(token, options.current);
    setProductsCategory(response.productsCategory);
    setPagination(response.pagination);
  }

  const handlePrev = async (e) => {
    if (currentPage.current > 1) {
      currentPage.current = currentPage.current - 1;
      options.current = {
        ...options.current,
        page: `${currentPage.current}`
      }
      const response = await getProductsCategory(token, options.current);
      setProductsCategory(response.productsCategory);
      setPagination(response.pagination);
    }
  }

  const handleNext = async (e) => {
    if (currentPage.current < pagination.totalPage) {
      currentPage.current = currentPage.current + 1;
      options.current = {
        ...options.current,
        page: `${currentPage.current}`
      }
      const response = await getProductsCategory(token, options.current);
      setProductsCategory(response.productsCategory);
      setPagination(response.pagination);
    }
  }
  // End Pagination

  // Filter Status
  const handleFilter = async (e) => {
    e.preventDefault();
    status.current = e.target.value;

    options.current = {
      ...options.current,
      status: status.current
    }

    const response = await getProductsCategory(token, options.current);
    setProductsCategory(response.productsCategory);
    setPagination(response.pagination);
  }
  // End Filter Status

  // Search
  const handleSearch = async (e) => {
    e.preventDefault();

    const keyword = e.target[0].value;

    if (keyword) {
      options.current = {
        ...options.current,
        keyword: keyword
      }
      const response = await getProductsCategory(token, options.current);
      setProductsCategory(response.productsCategory);
      setPagination(response.pagination);
    } else {
      options.current = {
        ...options.current,
        keyword: ``
      }
      const response = await getProductsCategory(token, options.current);
      setProductsCategory(response.productsCategory);
      setPagination(response.pagination);
    }
  }
  // End Search

  // Tree Category
  const parentCategory = treeCategory(productsCategory);
  // Tree Category

  const category = [];

  parentCategory.map(item => {
    category.push(item);
    item.children.map(item_child => {
      category.push(item_child);
    })
  })

  const handleDelete = (item) => {
    const id = item._id;

    Swal.fire({
      title: "Bạn chắc chắn muốn xoá danh mục này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Huỷ",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/admin/products-category/delete/${id}`);
        Swal.fire({
          title: "Xoá thành công!",
          text: "Danh mục đã bị xoá!",
          icon: "success"
        });
      }
    });
  }


  return (
    <>
      <Helmet>
        <title>Danh mục sản phẩm</title>
      </Helmet>
      <div className="main main__admin products-category">
        <div className="filter-search">
          <div className="filter">
            <div className="filter-search__title">
              <b>Trạng thái</b>
            </div>
            <button className={"button-action" + (status.current == "" ? "--active" : "")} value="" onClick={handleFilter}>Tất cả</button>
            <button className={"button-action" + (status.current == "active" ? "--active" : "")} value="active" onClick={handleFilter}>Hoạt động</button>
            <button className={"button-action" + (status.current == "inactive" ? "--active" : "")} value="inactive" onClick={handleFilter}>Dừng hoạt động</button>
          </div>
          <div className="search">
            <div className="filter-search__title">
              <b>Tìm kiếm</b>
            </div>
            <form onSubmit={handleSearch}
              className="form-search">
              <input type="text" name='keyword' placeholder="Bạn tìm gì..." />
              <button type="submit"><SearchOutlined /></button>
            </form>
          </div>
        </div>

        <div className="products__header">
          <b>Danh mục sản phẩm</b>
          <div className="sort-create">
            <div className="create">
              <a href="/admin/products-category/create" className="button-action"><PlusCircleOutlined />
                <p>Thêm mới</p></a>
            </div>
          </div>
        </div>

        <table className="products__table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Hình ảnh</th>
              <th>Tiêu đề</th>
              <th>Vị trí</th>
              <th>Trạng thái</th>
              <th>Thời gian tạo</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {category.length > 0 ? category.map((item, index) => (
              <tr>
                <td>{pagination.limitItems * (pagination.currentPage - 1) + (index + 1)}</td>
                <td>
                  <img src={item.thumbnail} alt={item.title} style={{ width: "auto", height: "70px" }} />
                </td>
                <td>{item.parent_id === '' ? "-- " + (item.title) : "-- -- " + (item.title)}</td>
                <td>{item.position} </td>
                <td>
                  <div className={"products__status"}>
                    {item.status === "active" ?
                      <div className="products__status--active">Hoạt động</div>
                      :
                      <div className="products__status--inactive">Dừng hoạt động</div>
                    }
                  </div>
                </td>
                <td>{new Date(item.createdAt)?.toLocaleString('en-GB').split(",")[0]}
                {new Date(item.createdAt)?.toLocaleString('en-GB').split(",")[1]}
                </td>
                <td className="products__action">
                  <a href={`/admin/products-category/detail/${item._id}`} className="button-action">Chi tiết</a>
                  <a href={`/admin/products-category/edit/${item._id}`} className="button-action">Sửa</a>
                  <button onClick={() => handleDelete(item)} className="button-action">Xoá</button>
                </td>
              </tr>
            )) : productsCategory.map((item, index) => (
              <tr>
                <td>{pagination.limitItems * (pagination.currentPage - 1) + (index + 1)}</td>
                <td>
                  <img src={item.thumbnail} alt={item.title} style={{ width: "auto", height: "70px" }} />
                </td>
                <td>{item.parent_id === '' ? "-- " + (item.title) : "-- -- " + (item.title)}</td>
                <td>{item.position} </td>
                <td>
                  <div className={"products__status"}>
                    {item.status === "active" ?
                      <div className="products__status--active">Hoạt động</div>
                      :
                      <div className="products__status--inactive">Dừng hoạt động</div>
                    }
                  </div>
                </td>
                <td>{new Date(item.createdAt)?.toLocaleString('en-GB').split(",")[0]}
                {new Date(item.createdAt)?.toLocaleString('en-GB').split(",")[1]}
                </td>
                <td className="products__action">
                  <a href={`/admin/products-category/detail/${item._id}`} className="button-action">Chi tiết</a>
                  <a href={`/admin/products-category/edit/${item._id}`} className="button-action">Sửa</a>
                  <button onClick={() => handleDelete(item)} className="button-action">Xoá</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <div className="pagination">
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
        </div> */}
      </div>
    </>
  )
}

export default ProductsCategory;