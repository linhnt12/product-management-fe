import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { deleteProduct } from "../../../services/adminService";
import { getCookie } from "../../../helpers/cookie";


function ProductDelete() {
  const token = getCookie("token");
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchApi = async () => {
      const response = await deleteProduct(token, id);
    }
    fetchApi();
    navigate("/admin/products");
  }, [])

  return (
    <></>
  )
}

export default ProductDelete;