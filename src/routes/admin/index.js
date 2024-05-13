import LayoutDefault from "../../pages/admin/layout";

import Dashboard from "../../pages/admin/Dashboard";
import Products from "../../pages/admin/Products";
import ProductsCategory from "../../pages/admin/ProductsCategory";
import LoginAdmin from "../../pages/admin/LoginAdmin";
import PrivateAdminRoutes from "../../components/PrivateAdminRoutes";
import LogoutAdmin from "../../pages/admin/LogoutAdmin";
import ProductCreate from "../../pages/admin/ProductCreate";
import ProductEdit from "../../pages/admin/ProductEdit";
import ProductDetailAdmin from "../../pages/admin/ProductDetailAdmin";
import ProductDelete from "../../pages/admin/ProductDelete";
import MyAccount from "../../pages/admin/MyAccount";
import ProductCategoryDelete from "../../pages/admin/ProductCategoryDelete";
import ProductCategoryCreate from "../../pages/admin/ProductCategoryCreate";
import ProductCategoryEdit from "../../pages/admin/ProductCategoryEdit";
import ProductCategoryDetail from "../../pages/admin/ProductCategoryDetail";
import LayoutAdminDefault from "../../pages/admin/layout";
import Page404 from "../../pages/client/Page 404";

export const routes = [
  {
    path: "/admin",
    element: <PrivateAdminRoutes />,
    children: [
      {
        path: "",
        element: <LayoutAdminDefault />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />
          },
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "products/create",
            element: <ProductCreate />
          },
          {
            path: "products/edit/:id",
            element: <ProductEdit />
          },
          {
            path: "products/detail/:id",
            element: <ProductDetailAdmin />
          },
          {
            path: "products/delete/:id",
            element: <ProductDelete />
          },
          {
            path: "products-category",
            element: <ProductsCategory />
          },
          {
            path: "products-category/create",
            element: <ProductCategoryCreate />
          },
          {
            path: "products-category/edit/:id",
            element: <ProductCategoryEdit />
          },
          {
            path: "products-category/detail/:id",
            element: <ProductCategoryDetail />
          },
          {
            path: "products-category/delete/:id",
            element: <ProductCategoryDelete />
          },
          {
            path: "logout",
            element: <LogoutAdmin />
          },
          {
            path: "my-account",
            element: <MyAccount />
          },
          {
            path: "*",
            element: <Page404 />
          },
          {
            path: "404",
            element: <Page404 />
          },
        ]
      }
    ]
  },
  {
    path: "/admin/auth/login",
    element: <LoginAdmin />
  }
]