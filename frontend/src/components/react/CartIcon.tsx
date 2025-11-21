import { useCart } from './CartContext';

interface CartIconProps {
  onOpenCart: () => void;
}

/**
 * COMPONENTE: CartIcon
 * 
 * ¿Qué hace?
 * - Muestra un icono de carrito con la cantidad de productos
 * - Al hacer clic, abre el modal del carrito
 * 
 * ¿Por qué es un React Island?
 * - Necesita interactividad (click)
 * - Necesita estado global (cantidad de items del carrito)
 * - Se actualiza dinámicamente sin recargar la página
 */
export const CartIcon = ({ onOpenCart }: CartIconProps) => {
  const { totalItems } = useCart();

  return (
    <button
      onClick={onOpenCart}
      className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
      aria-label="Abrir carrito"
    >
      {/* Icono SVG del carrito */}
      <svg
        className="w-6 h-6 text-gray-700"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      
      {/* Badge con la cantidad de items */}
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  );
};