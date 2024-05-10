import "./CheckoutItem.scss";

function CheckoutItem(props) {
  const { item } = props;

  return (
    <>
      {item ?
        <div className="checkout-item">
          <div className="checkout-item__image">
            <img src={item.thumbnail} />
          </div>
          <div className="checkout-item__content">
            <div className="checkout-item__title">
              <b>{item.title}</b>
            </div>
            <div className="checkout-item__quantity">
              <b>x {item.quantity}</b>
            </div>
          </div>
        </div>
        : <></>}
    </>
  )
}
export default CheckoutItem;