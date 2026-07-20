import { useState } from "react";
import { FaStar, FaRegClock, FaFire, FaPlus } from "react-icons/fa";
import "./FoodCard.css";

import burger from "../assets/Burger.jpg";
import pasta from "../assets/Pasta.jpg";
import ramen from "../assets/Ramen.jpg";
import chicken from "../assets/Chicken_Fry.jpg";
import fish from "../assets/Fish_and_Chips.jpg";
import drink from "../assets/Cold_Drinks.jpg";
import pizza from "../assets/Pizza.jpg";

function FoodCard({ addToCart, searchQuery = "", selectedCategory = "All" }) {
  const [selectedFood, setSelectedFood] = useState(null);
  const [spiceLevel, setSpiceLevel] = useState("Medium");
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const foods = [
    {
      id: 2,
      name: "Gourmet Beef Burger",
      price: 380,
      image: burger,
      category: "Fast Food",
      rating: 4.8,
      prepTime: "15 min",
      description: "Flame-grilled succulent beef patty with melted cheddar cheese, fresh lettuce, vine tomatoes, and our signature burger sauce in a toasted brioche bun.",
      spiceOption: true,
      addons: [
        { name: "Extra Cheese", price: 40 },
        { name: "Extra Patty", price: 120 },
        { name: "Crispy Bacon", price: 60 }
      ]
    },
    {
      id: 3,
      name: "Creamy Alfredo Pasta",
      price: 400,
      image: pasta,
      category: "Italian",
      rating: 4.6,
      prepTime: "20 min",
      description: "Fettuccine pasta tossed in a rich, creamy parmesan cheese sauce with fresh garlic, sautéed mushrooms, and garnished with parsley.",
      spiceOption: false,
      addons: [
        { name: "Grilled Chicken", price: 90 },
        { name: "Extra Mushrooms", price: 30 },
        { name: "Garlic Bread (2 pcs)", price: 50 }
      ]
    },
    {
      id: 4,
      name: "Authentic Tonkotsu Ramen",
      price: 600,
      image: ramen,
      category: "Asian",
      rating: 4.9,
      prepTime: "25 min",
      description: "Traditional rich pork bone broth served with tender chashu pork belly slices, soft-boiled marinated egg, nori seaweed, bamboo shoots, and green onions.",
      spiceOption: true,
      addons: [
        { name: "Extra Chashu Pork", price: 110 },
        { name: "Extra Soft Boiled Egg", price: 40 },
        { name: "Spicy Chili Paste", price: 20 }
      ]
    },
    {
      id: 5,
      name: "Crispy Southern Chicken Fry",
      price: 450,
      image: chicken,
      category: "Fast Food",
      rating: 4.7,
      prepTime: "15 min",
      description: "Three pieces of golden-brown, double-dredged chicken leg quarters, seasoned with our secret blend of 11 herbs and spices. Juicy inside and extra crunchy outside.",
      spiceOption: true,
      addons: [
        { name: "Extra Fried Chicken Piece", price: 140 },
        { name: "Spicy Dip Sauce", price: 30 },
        { name: "Cheese Sauce", price: 40 }
      ]
    },
    {
      id: 6,
      name: "Golden Fish and Chips",
      price: 600,
      image: fish,
      category: "Fast Food",
      rating: 4.5,
      prepTime: "18 min",
      description: "Crispy beer-battered cod fish fillet served with thick-cut double-fried chips, home-style tartar sauce, and a wedge of fresh lemon.",
      spiceOption: false,
      addons: [
        { name: "Extra Fish Fillet", price: 180 },
        { name: "Tartar Sauce Extra", price: 25 },
        { name: "Mashed Peas", price: 40 }
      ]
    },
    {
      id: 7,
      name: "Premium Mocktails & Drinks",
      price: 200,
      image: drink,
      category: "Beverages",
      rating: 4.4,
      prepTime: "5 min",
      description: "Chilled refreshing beverage of your choice. Choose between Mint Mojito, Blue Lagoon, Iced Peach Tea, or classic Coca-Cola.",
      spiceOption: false,
      addons: [
        { name: "Extra Mint & Lime", price: 20 },
        { name: "Add Ice Cream Scoop", price: 60 },
        { name: "Large Upgrade", price: 50 }
      ]
    },
    {
      id: 8,
      name: "Classic Pepperoni Pizza",
      price: 800,
      image: pizza,
      category: "Italian",
      rating: 4.8,
      prepTime: "22 min",
      description: "12-inch hand-tossed classic pizza loaded with premium spicy pepperoni slices, rich marinara sauce, and gooey, fresh mozzarella cheese.",
      spiceOption: true,
      addons: [
        { name: "Extra Pepperoni", price: 90 },
        { name: "Extra Cheese Crust", price: 150 },
        { name: "Jalapenos", price: 40 }
      ]
    },
  ];

  // Filtering Logic
  const filteredFoods = foods.filter((food) => {
    const matchesCategory =
      selectedCategory === "All" || food.category === selectedCategory;
    const matchesSearch = food.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) || 
      food.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openModal = (food) => {
    setSelectedFood(food);
    setSpiceLevel(food.spiceOption ? "Medium" : null);
    setSelectedAddons([]);
    setQuantity(1);
  };

  const closeModal = () => {
    setSelectedFood(null);
  };

  const handleAddonChange = (addon) => {
    if (selectedAddons.some((a) => a.name === addon.name)) {
      setSelectedAddons(selectedAddons.filter((a) => a.name !== addon.name));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const calculateModalTotal = () => {
    if (!selectedFood) return 0;
    const addonsTotal = selectedAddons.reduce((sum, item) => sum + item.price, 0);
    return (selectedFood.price + addonsTotal) * quantity;
  };

  const handleAddToCartClick = () => {
    const customizedItem = {
      ...selectedFood,
      id: `${selectedFood.id}-${spiceLevel || "none"}-${selectedAddons.map(a => a.name).sort().join(",")}`,
      originalId: selectedFood.id,
      spiceLevel,
      addons: selectedAddons,
      customPrice: selectedFood.price + selectedAddons.reduce((sum, item) => sum + item.price, 0),
      quantity: quantity
    };

    addToCart(customizedItem);
    closeModal();
  };

  return (
    <div className="catalog-container">
      {filteredFoods.length === 0 ? (
        <div className="no-items">
          <p className="no-items-emoji">🔍</p>
          <h3>No delicious dishes found</h3>
          <p>Try refining your search or choosing a different category.</p>
        </div>
      ) : (
        <div className="grid">
          {filteredFoods.map((food) => (
            <div className="card" key={food.id} onClick={() => openModal(food)}>
              <div className="card-image-wrapper">
                <img src={food.image} alt={food.name} />
                <span className="card-category-badge">{food.category}</span>
              </div>

              <div className="card-content">
                <div className="card-meta">
                  <span className="rating-badge">
                    <FaStar className="star-icon" /> {food.rating}
                  </span>
                  <span className="prep-time">
                    <FaRegClock /> {food.prepTime}
                  </span>
                </div>
                
                <h2 className="card-title">{food.name}</h2>
                <p className="card-desc">{food.description}</p>
                
                <div className="card-footer">
                  <h3 className="card-price">Rs {food.price}</h3>
                  <button className="add-btn" onClick={(e) => {
                    e.stopPropagation();
                    openModal(food);
                  }}>
                    <FaPlus /> Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Customization Details Modal */}
      {selectedFood && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content animate-fade" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>&times;</button>
            
            <div className="modal-body-layout">
              <div className="modal-image-panel">
                <img src={selectedFood.image} alt={selectedFood.name} />
              </div>
              
              <div className="modal-info-panel">
                <span className="modal-category">{selectedFood.category}</span>
                <h2 className="modal-title">{selectedFood.name}</h2>
                
                <div className="modal-meta">
                  <span className="rating"><FaStar className="star-icon" /> {selectedFood.rating}</span>
                  <span className="time"><FaRegClock /> {selectedFood.prepTime}</span>
                </div>

                <p className="modal-desc">{selectedFood.description}</p>

                {/* Spice Level Section */}
                {selectedFood.spiceOption && (
                  <div className="custom-section">
                    <h4 className="section-title">
                      <FaFire className="fire-icon" /> Spice Level
                    </h4>
                    <div className="spice-selectors">
                      {["Mild", "Medium", "Hot"].map((level) => (
                        <label key={level} className={`spice-label ${spiceLevel === level ? "active" : ""}`}>
                          <input
                            type="radio"
                            name="spice"
                            value={level}
                            checked={spiceLevel === level}
                            onChange={() => setSpiceLevel(level)}
                          />
                          {level}
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add-ons Section */}
                {selectedFood.addons && selectedFood.addons.length > 0 && (
                  <div className="custom-section">
                    <h4 className="section-title">Add Extra Delight</h4>
                    <div className="addons-list">
                      {selectedFood.addons.map((addon) => (
                        <label key={addon.name} className={`addon-label ${selectedAddons.some((a) => a.name === addon.name) ? "active" : ""}`}>
                          <input
                            type="checkbox"
                            checked={selectedAddons.some((a) => a.name === addon.name)}
                            onChange={() => handleAddonChange(addon)}
                          />
                          <span className="addon-name">{addon.name}</span>
                          <span className="addon-price">+Rs {addon.price}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity & Add to Cart Footer */}
                <div className="modal-footer">
                  <div className="qty-picker">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>
                  
                  <button className="modal-add-cart-btn" onClick={handleAddToCartClick}>
                    Add to Bag (Rs {calculateModalTotal()})
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FoodCard;