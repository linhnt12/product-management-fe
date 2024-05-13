import { detailProduct, editProduct, getProductsCategory } from "../../../services/adminService";
import { getCookie } from "../../../helpers/cookie";
import { useEffect, useState } from "react";
import { treeCategory } from "../../../helpers/treeCategory";
import { TreeSelect } from 'antd';
import { treeSelect } from "../../../helpers/treeSelect";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

function ProductEdit() {
  const navigate = useNavigate();
  const token = getCookie("token");
  const params = useParams();
  const id = params.id;

  const [productsCategory, setProductsCategory] = useState([]);
  const [product, setProduct] = useState([]);

  const [value, setValue] = useState("");
  const [status, setStatus] = useState("");

  // Product
  useEffect(() => {
    const fetchApi = async () => {
      const response = await detailProduct(token, id);
      setProduct(response.products);
      setValue(response.products.product_category_id);
      setStatus(response.products.status);
    }
    fetchApi();
  }, []);
  // End Product

  // Products Category
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getProductsCategory(token);
      setProductsCategory(response.productsCategory);
    }
    fetchApi();
  }, []);
  // End Products Category

  // Status
  const handleStatus = (e) => {
    setStatus(e.target.value);
  }
  // End Status

  // Tree Category
  const parentCategory = treeCategory(productsCategory);
  // Tree Category

  // Tree Select
  const treeData = treeSelect(parentCategory);

  const handleChange = (e) => {
    setValue(e);
  }
  // End Tree Select

  const handleSubmit = async (e) => {
    e.preventDefault();

    let status = "";

    if (e.target[8].checked == true) {
      status = "active";
    } else if (e.target[9].checked == true) {
      status = "inactive"
    };

    const options = {
      title: e.target[0].value,
      product_category_id: value,
      description: e.target[2].value,
      price: e.target[3].value,
      discountPercentage: e.target[4].value,
      stock: e.target[5].value,
      thumbnail: e.target[6].value,
      position: e.target[7].value,
      status: status
    }

    const response = await editProduct(token, id, options);
    Swal.fire({
      position: "center",
      icon: "success",
      title: response.message,
      showConfirmButton: false,
      timer: 1500
    });
    navigate(`/admin/products/edit/${id}`);
  }

  return (
    <>
      <Helmet>
        <title>{product.title}</title>
      </Helmet>
      <div className="main main__admin create-product">
        <div className="products__header">
          <b>Chỉnh sửa sản phẩm</b>
        </div>
        <form onSubmit={handleSubmit} className="form-create-product">
          <div className="form-group">
            <label>Tiêu đề</label>
            <input type="text" name="title" id="title" defaultValue={product.title} required />
          </div>
          <div className="form-group">
            <label>Danh mục sản phẩm</label>
            <TreeSelect
              style={{ width: '100%', margin: "15px 0px" }}
              value={value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="-- Chọn danh mục --"
              allowClear
              treeDefaultExpandAll
              onChange={handleChange}
              treeData={treeData}
              name="product_category_id"
              id="product_category_id"
            />
          </div>
          <div className="form-group">
            <label>Mô tả</label>
            <textarea name="description" id="description" defaultValue={product.description} />
          </div>
          <div className="form-group">
            <label>Giá</label>
            <input type="number" name="price" id="price" min={0} defaultValue={product.price} />
          </div>
          <div className="form-group">
            <label>Giảm giá (%)</label>
            <input type="number" name="discountPercentage" id="discountPercentage" min={0} defaultValue={product.discountPercentage} />
          </div>
          <div className="form-group">
            <label>Số lượng</label>
            <input type="number" name="stock" id="stock" min={0} defaultValue={product.stock} />
          </div>
          <div className="form-group">
            <label>Ảnh</label>
            <input type="text" name="thumbnail" id="thumbnail" accept="image/*" defaultValue={product.thumbnail} />
          </div>
          <div className="form-group">
            <label>Vị trí</label>
            <input type="number" name="position" id="position" placeholder="Tự động tăng" defaultValue={product.position} />
          </div>
          <label>Trạng thái</label>
          <div className="form-group form-check">
            <div className="form-check-inline">
              <input type="radio" id="statusActive"
                value="active"
                checked={status == "active"}
                onChange={handleStatus} />
              <label>Hoạt động</label>
            </div>
            <div className="form-check-inline">
              <input type="radio" id="statusInActive"
                value="inactive"
                checked={status == "inactive"}
                onChange={handleStatus}
              />
              <label>Dừng hoạt động</label>
            </div>
          </div>
          <div className="form-group">
            <button type="submit">Cập nhật</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ProductEdit;