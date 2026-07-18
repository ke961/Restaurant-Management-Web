import "./FoodCard.css";


import burger from "../assets/Burger.jpg";
import pasta from "../assets/Pasta.jpg";
import ramen from "../assets/Ramen.jpg";
import chicken from "../assets/Chicken_Fry.jpg";
import fish from "../assets/Fish_and_Chips.jpg";
import drink from "../assets/Cold_Drinks.jpg";
import pizza from "../assets/Pizza.jpg";


function FoodCard({ addToCart }) {
  const foods = [
    {
      id: 2,
      name: "Burger",
      price: 380,
      image: burger,
    },
    {
      id: 3,
      name: "Pasta",
      price: 400,
      image: pasta,
    },
    {
      id: 4,
      name: "Ramen",
      price: 600,
      image: ramen,
    },
    {
      id: 5,
      name: "Chicken Fry",
      price: 450,
      image: chicken,
    },
    {
      id: 6,
      name: "Fish and Chips",
      price: 600,
      image: fish,
    },
    {
      id: 7,
      name: "Cold Drinks",
      price: 200,
      image: drink,
    },

    {
      id: 8,
      name: "Pizza",
      price: 800,
      image: pizza,
    },
  ];

  return (
    <div className="grid">
      {foods.map((food) => (
        <div className="card" key={food.id}>
          <img src={food.image} alt={food.name} />

          <h2>{food.name}</h2>
          <h3>Rs {food.price}</h3>

          <button onClick={() => addToCart(food)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default FoodCard;