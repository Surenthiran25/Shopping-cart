import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartModal from './components/CartModal';
import Alert from './components/Alert';
import { Product } from './types';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    if (cartItems.some(item => item.id === product.id)) {
      setShowAlert(true);
      return;
    }
    setCartItems(prev => [...prev, product]);
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl">{error}</p>
          <button
            onClick={fetchProducts}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar cartCount={cartItems.length} onCartClick={() => setIsCartOpen(true)} />
      
      <main className="container mx-auto px-4 pt-20 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              isInCart={cartItems.some(item => item.id === product.id)}
            />
          ))}
        </div>
      </main>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
      />

      {showAlert && (
        <Alert
          message="Item already added to the cart"
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}

export default App;