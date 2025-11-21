import { useState } from 'react';
import { useCart } from './CartContext';
import type { CartItem } from '../../lib/types';

interface AddToCartButtonProps {
  product: Omit<CartItem, 'quantity'>;
}

/**
 * COMPONENTE: AddToCartButton
 * 
 * ¿Qué hace?
 * - Botón para añadir un producto al carrito
 * - Muestra feedback visual cuando se añade
 * - Usa el contexto del carrito para actualizar el estado global
 * 
 * ¿Por qué es un React Island?
 * - Interactividad (click)
 * - Animación y feedback visual
 * - Actualiza estado global sin recargar
 */
export const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    addToCart(product);
    setIsAdded(true);

    // Reset del feedback después de 2 segundos
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isAdded}
      className={`
        w-full py-3 px-6 rounded-lg font-bold transition-all
        ${isAdded
          ? 'bg-green-500 text-white'
          : 'bg-primary-600 hover:bg-primary-700 text-white'
        }
      `}
    >
      {isAdded ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          ¡Añadido!
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Añadir al Carrito
        </span>
      )}
    </button>
  );
};