import { useRoutes } from "react-router-dom";
import { routes } from "../../routes/admin/index";

function AdminRoutes() {
  const elements = useRoutes(routes);
  return (
    <>
      {elements}
    </>
  )
}

export default AdminRoutes;