import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useCart } from "../contexts/cartContext"

export const CartItem = ({ item, className }) => {

  function limitWords(text, limit) {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    } else {
      return text;
    }
  }
  
  // const dispatch = useDispatch()
  const { addToCart, removeOne, removeItem } = useCart()
  const limitedDescription = limitWords(item.product.description, 60); // Limit to 20 words
  const limitedProductName = limitWords(item.product.name, 3); // Limit to 20 words
  const removeOneFromCart = () => {
    // dispatch(removeOne(item.product._id))
    removeOne(item.product._id)
  }

  const addOneToCart = () => {
    // dispatch(addToCart(item.product))
    addToCart(item.product)
  }

  const deleteProduct = () => {
    // dispatch(removeItem(item.product._id))
    removeItem(item.product._id)
  }

  return (
    <div className={`checkout-item ${className}`}>
      <div className={`item-info ${className}`}>
        <div className={`img-products ${className}`}><img src={item.product.images[0]} className={`product-image ${className}`} /></div>
          <div className={`item-info-text ${className}`}>
            <p className={`Product-name ${className}`}>{limitedProductName}</p>
            <p className={`product-description ${className}`}>{limitedDescription}</p>
            <p className={`quantity-price ${className}`}>{item.quantity} x {item.product.price}:- </p>
            </div>
      
      <div className="buttons">
        <div className={`amount-btns ${className}`}>
          <button onClick={removeOneFromCart} className={`remove-btn ${className}`}>
            <FaMinus className="minus-icon" /></button>
          <button onClick={addOneToCart} className={`add-btn ${className}`}>
            <FaPlus className="plus-icon" /></button>
            <button onClick={deleteProduct} className={`delete-btn ${className}`}>
          <FaTrash className="delete-icon" /></button>
        </div>
      </div>
      </div>
    </div>
  )
}