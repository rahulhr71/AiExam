import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// The main App component that orchestrates the entire e-commerce front-end
const App = () => {
  // Mock product data to simulate a database. In a real MERN app, this would come from a backend API.
  const mockProducts = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      price: 99.99,
      image: 'https://placehold.co/400x300/e2e8f0/1a202c?text=Headphones',
      description: 'High-quality sound with a comfortable, over-ear design. Perfect for music lovers.',
    },
    {
      id: 2,
      name: 'Smartwatch with Fitness Tracker',
      price: 199.99,
      image: 'https://placehold.co/400x300/e2e8f0/1a202c?text=Smartwatch',
      description: 'Track your steps, heart rate, and notifications on your wrist. A must-have for an active lifestyle.',
    },
    {
      id: 3,
      name: 'Portable Power Bank 20000mAh',
      price: 49.99,
      image: 'https://placehold.co/400x300/e2e8f0/1a202c?text=Power+Bank',
      description: 'Never run out of battery again. Fast charging for all your devices on the go.',
    },
    {
      id: 4,
      name: '4K Ultra HD Monitor 27-inch',
      price: 299.99,
      image: 'https://placehold.co/400x300/e2e8f0/1a202c?text=Monitor',
      description: 'Experience stunning visuals with vibrant colors and sharp details. Ideal for work and entertainment.',
    },
    {
      id: 5,
      name: 'Ergonomic Wireless Mouse',
      price: 29.99,
      image: 'https://placehold.co/400x300/e2e8f0/1a202c?text=Mouse',
      description: 'Designed for comfort and precision. Say goodbye to wrist strain with this ergonomic masterpiece.',
    },
    {
      id: 6,
      name: 'Mechanical Gaming Keyboard',
      price: 129.99,
      image: 'https://placehold.co/400x300/e2e8f0/1a202c?text=Keyboard',
      description: 'Built for gamers with satisfying tactile feedback and customizable RGB lighting.',
    },
  ];

  // State management for the shopping cart and modal visibility
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Function to add a product to the cart
  const addToCart = (product) => {
    // Check if the item already exists in the cart
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      // If it exists, create a new array with the quantity updated
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      // If it doesn't exist, add it to the cart with a quantity of 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  // Function to increase the quantity of an item in the cart
  const increaseQuantity = (productId) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrease the quantity of an item in the cart
  const decreaseQuantity = (productId) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0) // Remove item if quantity becomes 0
    );
  };

  // Calculate the total number of items in the cart
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Calculate the subtotal price of all items in the cart
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // ProductCard component to display a single product
  const ProductCard = ({ product, onAddToCart }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover object-center"
        onError={(e) => {
          e.target.onerror = null; // prevents infinite loop
          e.target.src = 'https://placehold.co/400x300/e2e8f0/1a202c?text=Placeholder';
        }}
      />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  // CartModal component for displaying the shopping cart
  const CartModal = ({ items, isOpen, onClose, onRemove, onIncrease, onDecrease, total }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6 md:p-8 relative max-h-[90vh] overflow-y-auto transform scale-95 md:scale-100 transition-transform duration-300">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b-2 pb-2">Your Shopping Cart</h2>

          {items.length === 0 ? (
            <p className="text-center text-lg text-gray-500 p-8">Your cart is empty. Start shopping!</p>
          ) : (
            <>
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                      />
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-gray-600">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button onClick={() => onDecrease(item.id)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-l-lg transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                        </button>
                        <span className="px-3 text-gray-700">{item.quantity}</span>
                        <button onClick={() => onIncrease(item.id)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-r-lg transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        </button>
                      </div>
                      <button onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-4 border-t-2">
                <div className="flex justify-between items-center mb-4 text-xl font-bold">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={onClose}
                  className="w-full bg-green-600 text-white font-bold py-3 rounded-full shadow-lg hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* Tailwind CSS CDN script */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Page Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-extrabold text-blue-600 tracking-tight">
            My MERN Store
          </a>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">{totalItems}</span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-10">
          Featured Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      </main>

      {/* Cart Modal Component */}
      <CartModal
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemove={removeFromCart}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        total={subtotal}
      />
    </div>
  );
};

// Mount the App component to the DOM
const root = createRoot(document.getElementById('root'));
root.render(<App />);

// In a real application, you'd use a bundler like Vite or Webpack
// and have an index.html file like this:
/*
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My E-commerce App</title>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
</body>
</html>
*/
