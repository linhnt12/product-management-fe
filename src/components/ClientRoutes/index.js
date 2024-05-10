import { useRoutes } from "react-router-dom";
import { routes } from "../../routes/client/index";

function ClientRoutes() {
  const elements = useRoutes(routes);
  return (
    <>
      {elements}
    </>
  )
}

export default ClientRoutes;