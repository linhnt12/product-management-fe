import { Tag } from "antd";
import "./ProductItem.scss";

function ProductItem(props) {
  const { item } = props;

  const newPrice =(item.price * (100 - item.discountPercentage) / 100).toFixed(); 

  return (
    <>
    {item ? <a href={`/detail/${item.slug}`} style={{color: "black"}}>
        <div className="product__item" key={item.id}>
          {item.discountPercentage ? <div className="product__percent">
            - {item.discountPercentage}%
          </div> : ""}
          <div className="product__image" >
            <img src={item.thumbnail} alt={item.title} />
          </div>
          <div className="product__content">
            <div className="product__title">
              <b>{item.title}</b>
            </div>
            <div className="product__price">
              <div className="product__price-new">
                {(parseInt(newPrice)).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
              </div>
              <div className="product__price-old">
                {(item.price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
              </div>
            </div>
            <div className="product__stock">
              {item.stock ?
                <Tag bordered={false} color="success">
                  Còn hàng
                </Tag> :
                <Tag bordered={false} color="default">
                  Tạm hết hàng
                </Tag>}
            </div>
          </div>
        </div>
      </a> : <></>}
    </>
  )
}
export default ProductItem;