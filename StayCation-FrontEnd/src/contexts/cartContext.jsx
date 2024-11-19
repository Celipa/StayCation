import { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)

  if(!context) throw new Error('useCart can not be used outside an CartContextProvider')

  return context
}

const getTotalPrice = (cart) => {
  let total = 0
  cart.forEach(item => {
    total += item.product.price * item.quantity
  })
  return total
}

const getTotalQuantity = (cart) => {
  let total = 0
  cart.forEach(item => {
    total += item.quantity
  })
  return total
}

const CartContextProvider = ({ children }) => {

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const totalQuantity = getTotalQuantity(cart)
  const totalPrice = getTotalPrice(cart)

  const addToCart = (product) => {
    const itemRef = cart.find(item => item.product._id === product._id)
    const newCart = [...cart]
    itemRef
    ? itemRef.quantity ++
    : newCart.push({ product, quantity: 1 })
    setCart(newCart)
  }

  const removeOne = (productId) => {
    const itemRef = cart.find(item => item.product._id === productId)
    let newCart = [...cart]
    itemRef.quantity <= 1
    ? newCart = newCart.filter(item => item.product._id !== productId)
    : itemRef.quantity --
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart)); // Save to localStorage
  }

  const removeItem = (productId) => {
    const newCart = cart.filter(item => item.product._id !== productId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart)); // Save to localStorage
  }

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart'); // Clear from localStorage
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const value = {
    cart,
    totalQuantity,
    totalPrice,
    addToCart,
    removeItem,
    removeOne,
    clearCart
  }

  return (
    <CartContext.Provider value={value}>
      { children }
    </CartContext.Provider>
  )
}

export default CartContextProvider