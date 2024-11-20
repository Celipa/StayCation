import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useCart } from "../contexts/cartContext"

export const CartItem = ({ item, className }) => {
  const { addToCart, removeOne, removeItem } = useCart()
  const removeOneFromCart = () => {
    // dispatch(removeOne(item.property._id))
    removeOne(item.property._id)
  }

  const addOneToCart = () => {
    // dispatch(addToCart(item.property))
    addToCart(item.property)
  }

  const deleteProperty = () => {
    // dispatch(removeItem(item.property._id))
    removeItem(item.property._id)
  }

  return (
    <div className={`checkout-item ${className}`}>
      <div className={`item-info ${className}`}>
        <div className={`img-propertys ${className}`}><img src={item.property.images[0]} className={`property-image ${className}`} /></div>
          <div className={`item-info-text ${className}`}>
            <p className={`Property-name ${className}`}>{limitedPropertyName}</p>
            <p className={`property-description ${className}`}>{limitedDescription}</p>
            <p className={`quantity-price ${className}`}>{item.quantity} x {item.property.price}:- </p>
            </div>
      
      <div className="buttons">
        <div className={`amount-btns ${className}`}>
          <button onClick={removeOneFromCart} className={`remove-btn ${className}`}>
            <FaMinus className="minus-icon" /></button>
          <button onClick={addOneToCart} className={`add-btn ${className}`}>
            <FaPlus className="plus-icon" /></button>
            <button onClick={deleteProperty} className={`delete-btn ${className}`}>
          <FaTrash className="delete-icon" /></button>
        </div>
      </div>
      </div>
    </div>
  )
}