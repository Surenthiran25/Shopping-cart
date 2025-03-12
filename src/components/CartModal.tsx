import React from 'react';
import { X } from 'lucide-react';
import { Product } from '../types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  onRemoveFromCart: (productId: number) => void;
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveFromCart,
}) => {
  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 border-b pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500">${item.price}</p>
                  </div>
                  <button
                    onClick={() => onRemoveFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="p-4 border-t">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total:</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;