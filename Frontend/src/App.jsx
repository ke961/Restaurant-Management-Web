import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Menu from "./Pages/Menu";
import Orders from "./Pages/Orders";
import CartPage from "./Pages/CartPage";

function App() {
  // Load initial state from LocalStorage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("food_paradise_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      console.error("Failed to parse cart from localStorage", e);
      return [];
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders = localStorage.getItem("food_paradise_orders");
      return savedOrders ? JSON.parse(savedOrders) : [];
    } catch (e) {
      console.error("Failed to parse orders from localStorage", e);
      return [];
    }
  });

  // Persist State Changes
  useEffect(() => {
    localStorage.setItem("food_paradise_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("food_paradise_orders", JSON.stringify(orders));
  }, [orders]);

  // Order Status Simulator
  useEffect(() => {
    const hasActiveOrders = orders.some((order) => order.status !== "Delivered");
    if (!hasActiveOrders) return;

    const interval = setInterval(() => {
      setOrders((prevOrders) => {
        let updated = false;
        
        const newOrders = prevOrders.map((order) => {
          if (order.status === "Delivered") return order;

          let nextStatus = order.status;
          if (order.status === "Placed") {
            nextStatus = "Preparing";
            updated = true;
          } else if (order.status === "Preparing") {
            nextStatus = "Out for Delivery";
            updated = true;
          } else if (order.status === "Out for Delivery") {
            nextStatus = "Delivered";
            updated = true;
          }

          if (nextStatus !== order.status) {
            return {
              ...order,
              status: nextStatus,
              statusHistory: [
                ...order.statusHistory,
                {
                  status: nextStatus,
                  time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                },
              ],
            };
          }
          return order;
        });

        return updated ? newOrders : prevOrders;
      });
    }, 25000); // Progress step every 25 seconds for nice simulation pace

    return () => clearInterval(interval);
  }, [orders]);

  return (
    <Routes>
      <Route
        path="/"
        element={<Home cart={cart} setCart={setCart} />}
      />

      <Route
        path="/menu"
        element={<Menu cart={cart} setCart={setCart} />}
      />

      <Route
        path="/orders"
        element={<Orders cart={cart} orders={orders} />}
      />

      <Route
        path="/cart"
        element={
          <CartPage
            cart={cart}
            setCart={setCart}
            orders={orders}
            setOrders={setOrders}
          />
        }
      />
    </Routes>
  );
}

export default App;