import { useState } from 'react';
import { CartProvider } from './CartContext';
import { CartIcon } from './CartIcon';
import { Cart } from './Cart';

/**
 * COMPONENTE: CartWrapper
 * 
 * ¿Qué hace?
 * - Envuelve toda la funcionalidad del carrito
 * - Gestiona el estado de apertura/cierre del modal
 * - Provee el contexto del carrito a todos los hijos
 * 
 * Este es el componente que se importa en el Layout principal
 * con client:load para que esté disponible en toda la app
 */
export const CartWrapper = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <CartIcon onOpenCart={() => setIsCartOpen(true)} />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </CartProvider>
  );
};