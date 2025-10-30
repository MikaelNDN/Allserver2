import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem('carrinho');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(itemId) {
    const itemExists = cartItems.find(item => item.id === itemId);
    if (itemExists) {
      alert('Este profissional já está no carrinho!');
      return;
    }
    setCartItems(prevItems => [...prevItems, { id: itemId, quantity: 1 }]);
    alert('Profissional adicionado ao carrinho!');
  }

  function removeFromCart(itemId) {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}