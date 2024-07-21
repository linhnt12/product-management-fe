import { useRoutes } from "react-router-dom";
import { routes } from "../../routes/index";

function Routes() {
  const elements = useRoutes(routes);
  return (
    <>
      {elements}
    </>
  )
}

export default Routes;