import { Helmet } from 'react-helmet';
import error from "../../../images/404.png";
import "./Page404.scss";

function Page404() {
  return (
    <>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <div className='page-404 main'>
        <div className='page-404__image'>
          <img src={error} />
        </div>
        <div className='page-404__redirect'>
          <a href='/' className='button-back'><b>Trang chủ</b></a>
        </div>

      </div>

    </>
  )
}

export default Page404;