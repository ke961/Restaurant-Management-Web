// import Navbar from "../Components/Navbar";
// import FoodCard from "../Components/FoodCard";
// import "./Menu.css";

// function Menu({ cart, setCart }) {
//   const addToCart = (food) => {
//     const exist = cart.find((item) => item.id === food.id);

//     if (exist) {
//       setCart(
//         cart.map((item) =>
//           item.id === food.id
//             ? {
//                 ...item,
//                 quantity: item.quantity + 1,
//               }
//             : item
//         )
//       );
//     } else {
//       setCart([
//         ...cart,
//         {
//           ...food,
//           quantity: 1,
//         },
//       ]);
//     }
//   };

//   return (
//     <>
//       <Navbar cart={cart} />

//       <FoodCard addToCart={addToCart} />
//     </>
//   );
// }

// export default Menu;




import { useState } from "react";
import Navbar from "../Components/Navbar";
import SearchBar from "../Components/SearchBar";
import FoodCard from "../Components/FoodCard";
import "./Menu.css";

function Menu({ cart, setCart }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const addToCart = (food) => {
    const exist = cart.find((item) => item.id === food.id);

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + food.quantity }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...food,
        },
      ]);
    }
  };

  return (
    <div className="menu-page">
      <Navbar cart={cart} />
      
      <div className="menu-page-header">
        <h1>Our Exquisite Menu</h1>
        <p>Hand-crafted culinary creations prepared with fresh, premium ingredients daily.</p>
      </div>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <FoodCard 
        addToCart={addToCart} 
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}

export default Menu;