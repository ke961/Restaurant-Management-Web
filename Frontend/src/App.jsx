import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Menu from "./Pages/Menu";
import Orders from "./Pages/Orders";
import CartPage from "./Pages/CartPage";

function App() {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

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
        element={<CartPage cart={cart} setCart={setCart}  orders={orders}
            setOrders={setOrders}/>}
      />
   
  


     
      


    </Routes>
  );
}

export default App;