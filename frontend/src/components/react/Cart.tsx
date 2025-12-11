import { useEffect, useState } from 'react';
import { 
  cartItems, 
  removeCartItem, 
  updateItemQuantity, 
  clearCart 
} from '../react/CartStore';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * COMPONENTE: Cart
 * * Modal lateral del carrito con diseño más limpio
 * Conectado a Nanostores en lugar de Context
 */
export const Cart = ({ isOpen, onClose }: CartProps) => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = cartItems.subscribe((cartData) => {
      setItems(Object.values(cartData));
    });
    return unsubscribe;
  }, []);

  // 3. Calculamos el total dinámicamente
  const totalPrice = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Generar mensaje de WhatsApp
  const generateWhatsAppMessage = () => {
    const WHATSAPP_NUMBER = import.meta.env.PUBLIC_WHATSAPP_NUMBER;
    const MESSAGE_PREFIX = import.meta.env.PUBLIC_WHATSAPP_MESSAGE_PREFIX || 
      'Hola! Me gustaría hacer un pedido:';

    let message = `${MESSAGE_PREFIX}\n\n`;
    
    items.forEach(item => {
      message += `• ${item.name} x${item.quantity} - ${(item.price * item.quantity).toLocaleString()}\n`;
    });
    
    message += `\n*Total: ${totalPrice.toLocaleString()}*`;

    const encodedMessage = encodeURIComponent(message);
    // Nota: Asegúrate de tener configurado PUBLIC_WHATSAPP_NUMBER en tu .env
    // Si no, esto abrirá un enlace roto.
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
        role="presentation"
      />

      {/* Panel lateral */}
      <div className="fixed right-0 top-0 h-full w-full sm:max-w-md bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300">
        
        {/* Header azul */}
        <div className="bg-primary-500 text-white p-3 sm:p-4 flex justify-between items-center sticky top-0">
          <button
            onClick={onClose}
            className="p-1 sm:p-2 hover:bg-primary-600 rounded-lg transition-colors"
            aria-label="Volver"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 className="text-lg sm:text-xl font-bold">Carrito</h2>
          <button
            onClick={clearCart}
            className="text-xs sm:text-sm hover:underline"
          >
            Vaciar
          </button>
        </div>

        {/* Items del carrito */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          {items.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <svg className="w-16 h-16 sm:w-24 sm:h-24 mx-auto text-gray-300 mb-4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-gray-500 text-base sm:text-lg font-medium">Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-3 pb-3 sm:pb-4 border-b">
                  {/* Imagen */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain bg-gray-50 rounded-lg flex-shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-xs sm:text-sm text-gray-800 line-clamp-1 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-primary-500 font-bold text-base sm:text-lg mb-2">
                      $ {item.price.toLocaleString()}
                    </p>

                    {/* Controles de cantidad */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-500 hover:bg-primary-600 text-white rounded-lg flex items-center justify-center transition-colors"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M20 12H4" />
                        </svg>
                      </button>
                      
                      <span className="font-bold text-gray-800 min-w-[2rem] text-center text-sm">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-500 hover:bg-primary-600 text-white rounded-lg flex items-center justify-center transition-colors"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Botón eliminar */}
                  <button
                    onClick={() => removeCartItem(item.id)}
                    className="p-1 sm:p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                    aria-label="Eliminar"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer con total y WhatsApp */}
        {items.length > 0 && (
          <div className="border-t bg-white p-3 sm:p-4 space-y-3 sm:space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-base sm:text-lg font-semibold text-gray-800">Total:</span>
              <span className="text-xl sm:text-2xl font-bold text-primary-500">
                $ {totalPrice.toLocaleString()}
              </span>
            </div>

            <button
              onClick={generateWhatsAppMessage}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg flex items-center justify-center gap-2 sm:gap-3 transition-colors shadow-lg text-sm sm:text-base"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>Pedir por WhatsApp</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};