import "./CartItem.scss";
import { DeleteOutlined } from '@ant-design/icons';
import { deleteCartItem, updateCartItem } from "../../../services/productsService";

function CartItem(props) {
  const { item } = props;

  const handleDelete = () => {
    const id = item._id;

    const fetchApi = async () => {
      const response = await deleteCartItem(id);
      window.location.href = '/cart';
    }
    fetchApi();
  }

  const handleAdd = () => {
    const id = item._id;
    const inputsQuantity = document.querySelectorAll(`input[id='quantity${id}']`);
    const value = parseInt(inputsQuantity[0].value);
    inputsQuantity[0].value = value + 1;

    const fetchApi = async () => {
      const response = await updateCartItem(id, value + 1);
      window.location.href = '/cart';
    }
    fetchApi();
  }

  const handleMinus = () => {
    const id = item._id;
    const inputsQuantity = document.querySelectorAll(`input[id='quantity${id}']`);
    const value = parseInt(inputsQuantity[0].value);
    if (value > 1) {
      inputsQuantity[0].value = value - 1;

      const fetchApi = async () => {
        const response = await updateCartItem(id, value - 1);
        window.location.href = '/cart';
      }
      fetchApi();
    }
  }

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.value > item.stock) {
      e.target.value = item.stock;
    }

    const id = item._id;

    const fetchApi = async () => {
      const response = await updateCartItem(id, parseInt(e.target.value));
      window.location.href = '/cart';
    }
    fetchApi();
  }

  return (
    <>
      {item ?
        <div className="cart-item">
          <div className="cart-item__delete">
            <button className="button-delete" onClick={handleDelete}>
              <DeleteOutlined />
            </button>
          </div>
          <div className="cart-item__image">
            <img src={item.thumbnail} />
          </div>
          <div className="cart-item__content">
            <div className="cart-item__title">
              {item.title}
            </div>
            <div className="cart-item__price-new">
            {(parseInt((item.price * (100 - item.discountPercentage) / 100).toFixed())).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
            </div>
            <div className="cart-item__quantity">
              <span className="minus" onClick={handleMinus}>-</span>
              <input id={`quantity${item._id}`} name="quantity" defaultValue={item.quantity} min={1} max={item.stock} onBlur={handleChange} />
              <span className="add" onClick={handleAdd}>+</span>
            </div>
            <div className="cart-item__stock">
              {item.stock ?
                <p className='cart-item__stock--active'>Còn hàng</p> : <p className='cart-item__stock--inactive'>Tạm hết hàng</p>}
            </div>
          </div>
        </div>
        : <></>}
    </>
  )
}
export default CartItem;