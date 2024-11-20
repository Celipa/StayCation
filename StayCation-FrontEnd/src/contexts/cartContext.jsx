import { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) throw new Error('useCart can not be used outside an CartContextProvider');

  return context;
};

const getTotalPrice = (cart) => {
  let total = 0;
  cart.forEach(item => {
    const price = item.property?.price || 0;
    total += price * (item.quantity || 0);
  });
  return total;
};

const getTotalQuantity = (cart) => {
  let total = 0;
  cart.forEach(item => {
    total += item.quantity || 0;
  });
  return total;
};

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const totalQuantity = getTotalQuantity(cart);
  const totalPrice = getTotalPrice(cart);

  const addToCart = (property) => {
    const itemRef = cart.find(item => item.property._id === property._id);
    const newCart = [...cart];
    if (itemRef) {
      itemRef.quantity++;
    } else {
      newCart.push({ property, quantity: 1 });
    }
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart)); // Save to localStorage
  };

  const removeOne = (propertyId) => {
    const itemRef = cart.find(item => item.property._id === propertyId);
    let newCart = [...cart];
    if (itemRef) {
      if (itemRef.quantity <= 1) {
        newCart = newCart.filter(item => item.property._id !== propertyId);
      } else {
        itemRef.quantity--;
      }
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart)); // Save to localStorage
    }
  };

  const removeItem = (propertyId) => {
    const newCart = cart.filter(item => item.property._id !== propertyId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart)); // Save to localStorage
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart'); // Clear from localStorage
  };

  return (
    <CartContext.Provider value={{ cart, totalQuantity, totalPrice, addToCart, removeOne, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;