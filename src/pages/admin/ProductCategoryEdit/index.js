import { detailProductsCategory, editProductsCategory, getProductsCategory } from "../../../services/adminService";
import { getCookie } from "../../../helpers/cookie";
import { useEffect, useState } from "react";
import { treeCategory } from "../../../helpers/treeCategory";
import { TreeSelect } from 'antd';
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

function ProductCategoryEdit() {
  const navigate = useNavigate();
  const token = getCookie("token");
  const params = useParams();
  const id = params.id;

  const [productsCategory, setProductsCategory] = useState([]);
  const [productCategory, setProductCategory] = useState([]);

  const [value, setValue] = useState("");
  const [status, setStatus] = useState("");

  // Product Category
  useEffect(() => {
    const fetchApi = async () => {
      const response = await detailProductsCategory(token, id);
      setProductCategory(response.productCategory);
      setValue(response.productCategory.parent_id);
      setStatus(response.productCategory.status);
    }
    fetchApi();
  }, []);
  // End Product Category

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
  const treeData = [{
    value: "",
    title: "-- Chọn danh mục cha --"
  }];

  parentCategory.map(item => {
    const data = {};
    data.value = item._id;
    data.title = item.title;
    treeData.push(data);
  })

  const handleChange = (e) => {
    setValue(e);
  }
  // End Tree Select

  const handleSubmit = async (e) => {
    e.preventDefault();

    let status = "";

    if (e.target[5].checked == true) {
      status = "active";
    } else if (e.target[6].checked == true) {
      status = "inactive"
    };

    const options = {
      title: e.target[0].value,
      parent_id: value,
      description: e.target[2].value,
      thumbnail: e.target[3].value,
      position: e.target[4].value,
      status: status
    }

    const response = await editProductsCategory(token, id, options);
    Swal.fire({
      position: "center",
      icon: "success",
      title: response.message,
      showConfirmButton: false,
      timer: 1500
    });
    navigate(`/admin/products-category/edit/${id}`);
  }


  return (
    <>
     <Helmet>
        <title>{productCategory.title}</title>
      </Helmet>
      <div className="main main__admin create-product">
        <div className="products__header">
          <b>Chỉnh sửa danh mục sản phẩm</b>
        </div>
        <form onSubmit={handleSubmit} className="form-create-product">
          <div className="form-group">
            <label>Tiêu đề</label>
            <input type="text" name="title" id="title" defaultValue={productCategory.title} required />
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
            />
          </div>
          <div className="form-group">
            <label>Mô tả</label>
            <textarea name="description" id="description" defaultValue={productCategory.description} />
          </div>
          <div className="form-group">
            <label>Ảnh</label>
            <input type="text" name="thumbnail" id="thumbnail" accept="image/*" defaultValue={productCategory.thumbnail} />
          </div>
          <div className="form-group">
            <label>Vị trí</label>
            <input type="number" name="position" id="position" placeholder="Tự động tăng" defaultValue={productCategory.position} />
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

export default ProductCategoryEdit;