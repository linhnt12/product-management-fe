import LayoutDefault from "../pages/client/layout/LayoutDefault";
import PrivateRoutes from "../components/PrivateRoutes";

import Home from "../pages/client/Home";
import Login from "../pages/client/Login";
import Register from "../pages/client/Register";
import UserInfo from "../pages/client/UserInfo";
import Category from "../pages/client/Category";
import ProductDetail from "../pages/client/Products/ProductDetail";
import Search from "../pages/client/Search";
import Logout from "../pages/client/Logout";
import Cart from "../pages/client/Cart";
import Checkout from "../pages/client/Checkout";
import CheckoutSucess from "../pages/client/Checkout/CheckoutSuccess";
import ForgotPassword from "../pages/client/Forgot Password";
import OTP from "../pages/client/OTP";
import ResetPassword from "../pages/client/ResetPassword";
import Page404 from "../pages/client/Page 404";
import PrivateAdminRoutes from "../components/PrivateAdminRoutes";
import LayoutAdminDefault from "../pages/admin/layout";
import Dashboard from "../pages/admin/Dashboard";
import Products from "../pages/admin/Products";
import ProductCreate from "../pages/admin/ProductCreate";
import ProductEdit from "../pages/admin/ProductEdit";
import ProductDelete from "../pages/admin/ProductDelete";
import ProductsCategory from "../pages/admin/ProductsCategory";
import ProductCategoryCreate from "../pages/admin/ProductCategoryCreate";
import ProductCategoryEdit from "../pages/admin/ProductCategoryEdit";
import ProductCategoryDetail from "../pages/admin/ProductCategoryDetail";
import ProductCategoryDelete from "../pages/admin/ProductCategoryDelete";
import LogoutAdmin from "../pages/admin/LogoutAdmin";
import MyAccount from "../pages/admin/MyAccount";
import LoginAdmin from "../pages/admin/LoginAdmin";
import ProductDetailAdmin from "../pages/admin/ProductDetailAdmin";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: ":slugCategory",
        element: <Category />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "checkout/success/:orderId",
        element: <CheckoutSucess />,
      },
      {
        path: "detail/:slugProduct",
        element: <ProductDetail />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "logout",
        element: <Logout />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "password/forgot",
        element: <ForgotPassword />
      },
      {
        path: "password/otp",
        element: <OTP />
      },
      {
        path: "*",
        element: <Page404 />
      },
      {
        path: "404",
        element: <Page404 />
      },
      {
        path: "user",
        element: <PrivateRoutes />,
        children: [
          {
            path: "info",
            element: <UserInfo />
          },
          {
            path: "password/reset",
            element: <ResetPassword />
          }
        ]
      }
    ]
  },
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
          }
        ]
      },
      {
        
      }
    ]
  },
  {
    path: "/admin/auth/login",
    element: <LoginAdmin />
  }
]