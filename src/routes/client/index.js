import LayoutDefault from "../../pages/client/layout/LayoutDefault";
import PrivateRoutes from "../../components/PrivateRoutes";

import Home from "../../pages/client/Home";
import Login from "../../pages/client/Login";
import Register from "../../pages/client/Register";
import UserInfo from "../../pages/client/UserInfo";
import Category from "../../pages/client/Category";
import ProductDetail from "../../pages/client/Products/ProductDetail";
import Search from "../../pages/client/Search";
import Logout from "../../pages/client/Logout";
import Cart from "../../pages/client/Cart";
import Checkout from "../../pages/client/Checkout";
import CheckoutSucess from "../../pages/client/Checkout/CheckoutSuccess";
import ForgotPassword from "../../pages/client/Forgot Password";
import OTP from "../../pages/client/OTP";
import ResetPassword from "../../pages/client/ResetPassword";

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
  }
]