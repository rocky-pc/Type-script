import { useState } from 'react';
import { ShoppingCart, Plus, Minus, Package, ArrowRight, QrCode } from 'lucide-react';
import qrImage from "./assets/qr.jpeg";
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

function App() {
  const [cart, setCart] = useState<Map<number, number>>(new Map());
  const [showDelivery, setShowDelivery] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  
  const products: Product[] = [
    {
      id: 1,
      name: "Camera",
      price: 499.99,
      image: "/src/assets/cam.jpg",
      description: "Professional DSLR camera with extra lenses."
    },
    {
      id: 2,
      name: "PlayStation",
      price: 399.99,
      image: "/src/assets/ps.jpg",
      description: "Sony PlayStation gaming console."
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: 99.99,
      image: "/src/assets/speaker.jpg",
      description: "JBL wireless speaker with deep bass."
    },
    {
      id: 4,
      name: "Smart Watch",
      price: 199.99,
      image: "/src/assets/watc.jpg",
      description: "Stylish smartwatch with health tracking."
    },
    {
      id: 5,
      name: "Laptop",
      price: 899.99,
      image: "/src/assets/comp.jpg",
      description: "High-performance laptop for professionals."
    },
    {
      id: 6,
      name: "Headphones",
      price: 149.99,
      image: "/src/assets/headset.jpg",
      description: "Wireless noise-canceling headphones."
    }
  ];

  const addToCart = (productId: number) => {
    const newCart = new Map(cart);
    newCart.set(productId, (cart.get(productId) || 0) + 1);
    setCart(newCart);
  };

  const removeFromCart = (productId: number) => {
    const newCart = new Map(cart);
    const currentQuantity = cart.get(productId) || 0;
    if (currentQuantity > 1) {
      newCart.set(productId, currentQuantity - 1);
    } else {
      newCart.delete(productId);
    }
    setCart(newCart);
  };

  const getTotal = () => {
    let total = 0;
    cart.forEach((quantity, productId) => {
      const product = products.find(p => p.id === productId);
      if (product) {
        total += product.price * quantity;
      }
    });
    return total.toFixed(2);
  };

  if (showPayment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-8">
        <div className="max-w-md mx-auto backdrop-blur-lg bg-white/30 rounded-2xl p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-white mb-8">Payment</h1>
          
          <div className="text-center space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
            <img 
  src={qrImage} 
  alt="Payment QR Code"
  className="w-full h-auto" 
/>
            </div>
            
            <div className="text-white">
              <p className="text-lg mb-2">Total Amount</p>
              <p className="text-3xl font-bold">${getTotal()}</p>
            </div>

            <p className="text-white/80">Scan the QR code to pay using UPI</p>
            <p className="text-white/80">UPI ID: sjega82@oksbi</p>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowPayment(false)}
                className="flex-1 px-6 py-3 rounded-xl bg-white/20 text-white font-semibold hover:bg-white/30 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => {
                  setCart(new Map());
                  setShowPayment(false);
                  setShowDelivery(false);
                  alert("Thank you for your purchase! 😊");
                }}
                className="flex-1 px-6 py-3 rounded-xl bg-white/20 text-white font-semibold hover:bg-white/30 transition-colors">
                Complete Order
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showDelivery) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-8">
        <div className="max-w-3xl mx-auto backdrop-blur-lg bg-white/30 rounded-2xl p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-white mb-8">Delivery Details</h1>
          
          <div className="space-y-6">
            {Array.from(cart.entries()).map(([productId, quantity]) => {
              const product = products.find(p => p.id === productId);
              if (!product) return null;
              return (
                <div key={productId} className="flex items-center justify-between bg-white/20 p-4 rounded-xl">
                  <div className="flex items-center gap-4">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div>
                      <h3 className="text-white font-semibold">{product.name}</h3>
                      <p className="text-white/80">Quantity: {quantity}</p>
                    </div>
                  </div>
                  <p className="text-white font-bold">${(product.price * quantity).toFixed(2)}</p>
                </div>
              );
            })}
            
            <div className="mt-8 space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <input
                type="text"
                placeholder="Delivery Address"
                className="w-full p-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <textarea
                placeholder="Additional Notes"
                className="w-full p-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 h-32"
              ></textarea>
            </div>

            <div className="flex justify-between items-center mt-8 pt-8 border-t border-white/20">
              <button
                onClick={() => setShowDelivery(false)}
                className="px-6 py-3 rounded-xl bg-white/20 text-white font-semibold hover:bg-white/30 transition-colors"
              >
                Back to Shop
              </button>
              <div className="text-right">
                <p className="text-white/80 mb-1">Total Amount</p>
                <p className="text-3xl font-bold text-white">${getTotal()}</p>
              </div>
            </div>

            <button 
              onClick={() => setShowPayment(true)}
              className="w-full mt-4 py-4 rounded-xl bg-white/20 text-white font-semibold hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
            >
              Proceed to Payment <QrCode className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="backdrop-blur-lg bg-white/30 rounded-2xl p-6 mb-8 shadow-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Package className="w-8 h-8 text-white" />
              <h1 className="text-3xl font-bold text-white">Smart Gadgets</h1>
            </div>
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-white" />
              {cart.size > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {Array.from(cart.values()).reduce((a, b) => a + b, 0)}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Product Cards */}
          {products.map((product) => (
            <div key={product.id} className="backdrop-blur-lg bg-white/20 rounded-2xl overflow-hidden shadow-xl transition-all hover:transform hover:scale-105">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-2">{product.name}</h2>
                <p className="text-white/80 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-white">${product.price}</span>
                  <div className="flex items-center gap-2">
                    {cart.has(product.id) && (
                      <>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="p-2 rounded-full backdrop-blur-lg bg-white/20 hover:bg-white/30 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-white" />
                        </button>
                        <span className="text-white font-bold">{cart.get(product.id)}</span>
                      </>
                    )}
                    <button
                      onClick={() => addToCart(product.id)}
                      className="p-2 rounded-full backdrop-blur-lg bg-white/20 hover:bg-white/30 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Total and Checkout Button */}
        {cart.size > 0 && (
          <div className="fixed bottom-8 right-8 backdrop-blur-lg bg-white/30 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-2">Cart Total</h2>
            <p className="text-2xl font-bold text-white mb-4">${getTotal()}</p>
            <button
              onClick={() => setShowDelivery(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/20 text-white font-semibold hover:bg-white/30 transition-colors"
            >
              Proceed to Delivery <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;