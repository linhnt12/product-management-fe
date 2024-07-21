import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { deleteProductCategory } from "../../../services/adminService";
import { getCookie } from "../../../helpers/cookie";


function ProductCategoryDelete() {
  const token = getCookie("token");
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchApi = async () => {
      const response = await deleteProductCategory(token, id);
    }
    fetchApi();
    navigate("/admin/products-category");
  }, [])

  return (
    <></>
  )
}

export default ProductCategoryDelete;