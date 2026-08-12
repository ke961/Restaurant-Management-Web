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
import koreanFriedChicken from "../assets/Korean_Fried_Chicken.png";
import bibimbap from "../assets/Bibimbap.png";
import tteokbokki from "../assets/Tteokbokki.png";
import dimSum from "../assets/Dim_Sum.png";
import padThai from "../assets/Pad_Thai.png";
import kimchiRice from "../assets/Kimchi_Fried_Rice.png";
import galbi from "../assets/Galbi.png";
import tonkatsu from "../assets/Tonkatsu.png";
import cornDog from "../assets/Corn_Dog.png";
import pho from "../assets/Pho.png";
import trufflePizza from "../assets/Truffle_Pizza.png";
import bobaTea from "../assets/Boba_Tea.png";
import sashimiPlatter from "../assets/Sashimi_Platter.png";

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
    {
      id: 9,
      name: "Korean Sweet & Spicy Fried Chicken",
      price: 520,
      image: koreanFriedChicken,
      category: "Korean",
      rating: 4.9,
      prepTime: "20 min",
      description: "Double-fried extra crunchy chicken coated in sweet & spicy sticky gochujang glaze, sprinkled with crushed peanuts and toasted sesame seeds.",
      spiceOption: true,
      addons: [
        { name: "Extra Honey Garlic Glaze", price: 35 },
        { name: "Pickled Radish Cubes", price: 40 },
        { name: "Crispy Rice Cakes Add-on", price: 60 }
      ]
    },
    {
      id: 10,
      name: "Dolsot Beef Bibimbap",
      price: 550,
      image: bibimbap,
      category: "Korean",
      rating: 4.8,
      prepTime: "18 min",
      description: "Sizzling hot rice bowl topped with savory bulgogi beef, sautéed seasonal vegetables, crispy nori, sunny-side egg, and authentic gochujang sauce.",
      spiceOption: true,
      addons: [
        { name: "Extra Bulgogi Beef", price: 120 },
        { name: "Extra Fried Egg", price: 30 },
        { name: "Kimchi Side Dish", price: 45 }
      ]
    },
    {
      id: 11,
      name: "Cheesy Spicy Tteokbokki",
      price: 420,
      image: tteokbokki,
      category: "Korean",
      rating: 4.7,
      prepTime: "15 min",
      description: "Chewy Korean rice cakes and tender fish cakes simmered in a fiery sweet-and-spicy gochujang chili sauce, topped with melted mozzarella cheese.",
      spiceOption: true,
      addons: [
        { name: "Melted Mozzarella Cheese", price: 50 },
        { name: "Rabokki Ramen Noodles", price: 60 },
        { name: "Fried Gimari Dumplings (2 pcs)", price: 70 }
      ]
    },
    {
      id: 12,
      name: "Pan-Asian Steamed Dim Sum",
      price: 480,
      image: dimSum,
      category: "Pan Asian",
      rating: 4.9,
      prepTime: "15 min",
      description: "Handcrafted bamboo-steamed dumplings filled with seasoned chicken, minced shrimp, scallions, and ginger. Served with house-made chili oil soy dip.",
      spiceOption: true,
      addons: [
        { name: "Extra Spicy Chili Oil", price: 25 },
        { name: "Steamed Bao Bun", price: 50 },
        { name: "Extra Dumplings (2 pcs)", price: 90 }
      ]
    },
    {
      id: 13,
      name: "Classic Thai Pad Thai",
      price: 580,
      image: padThai,
      category: "Pan Asian",
      rating: 4.8,
      prepTime: "20 min",
      description: "Wok-tossed rice noodles with succulent jumbo prawns, tofu, scrambled eggs, bean sprouts, crushed roasted peanuts, and fresh lime wedges.",
      spiceOption: true,
      addons: [
        { name: "Extra Jumbo Prawns (2 pcs)", price: 150 },
        { name: "Extra Roasted Peanuts", price: 25 },
        { name: "Crispy Wonton Strips", price: 40 }
      ]
    },
    {
      id: 14,
      name: "Korean Kimchi Fried Rice",
      price: 450,
      image: kimchiRice,
      category: "Korean",
      rating: 4.7,
      prepTime: "15 min",
      description: "Wok-fried jasmine rice with aged spicy kimchi and pork belly bites, topped with a fried egg, toasted sesame seeds, and crispy roasted seaweed.",
      spiceOption: true,
      addons: [
        { name: "Extra Fried Egg", price: 30 },
        { name: "Melted Cheese Layer", price: 50 },
        { name: "Roasted Nori Snack Pack", price: 35 }
      ]
    },
    {
      id: 15,
      name: "Korean LA Galbi Beef Ribs",
      price: 850,
      image: galbi,
      category: "Korean",
      rating: 4.9,
      prepTime: "22 min",
      description: "Sizzling prime beef short ribs marinated in soy, garlic, and pear glaze, served with toasted sesame, chopped scallions, and fresh lettuce wraps.",
      spiceOption: true,
      addons: [
        { name: "Extra Galbi Ribs", price: 250 },
        { name: "Garlic Ssamjang Dip", price: 30 },
        { name: "Steamed Rice Bowl", price: 40 }
      ]
    },
    {
      id: 16,
      name: "Japanese Tonkatsu Curry",
      price: 620,
      image: tonkatsu,
      category: "Pan Asian",
      rating: 4.8,
      prepTime: "20 min",
      description: "Crispy panko-breaded golden cutlet served over fluffy steamed rice with rich, savory Japanese brown curry and pickled red radish.",
      spiceOption: true,
      addons: [
        { name: "Extra Panko Cutlet", price: 150 },
        { name: "Extra Curry Sauce", price: 60 },
        { name: "Soft Boiled Ajitama Egg", price: 40 }
      ]
    },
    {
      id: 17,
      name: "Korean Mozzarella Potato Corn Dog",
      price: 290,
      image: cornDog,
      category: "Korean",
      rating: 4.9,
      prepTime: "12 min",
      description: "Iconic Korean street snack filled with stretchy mozzarella cheese, encrusted with crispy diced potato cubes, topped with sugar dust, ketchup & mustard.",
      spiceOption: true,
      addons: [
        { name: "Extra Cheese Pull", price: 40 },
        { name: "Spicy Honey Mustard Drizzle", price: 20 },
        { name: "Hot Cheeto Dust Crust", price: 35 }
      ]
    },
    {
      id: 18,
      name: "Vietnamese Tender Beef Pho",
      price: 590,
      image: pho,
      category: "Pan Asian",
      rating: 4.8,
      prepTime: "18 min",
      description: "Steaming 12-hour simmered aromatic beef broth served with rice noodles, tender rare beef slices, fresh Thai basil, bean sprouts, jalapeno, and lime.",
      spiceOption: true,
      addons: [
        { name: "Extra Beef Meatballs (3 pcs)", price: 80 },
        { name: "Extra Tender Beef Slices", price: 120 },
        { name: "Crispy Dough Sticks (Youtiao)", price: 40 }
      ]
    },
    {
      id: 19,
      name: "Wild Truffle & Mushroom Pizza",
      price: 920,
      image: trufflePizza,
      category: "Italian",
      rating: 4.9,
      prepTime: "22 min",
      description: "Artisanal hand-stretched pizza layered with wild sautéed mushrooms, fresh fior di latte mozzarella, aromatic thyme, and black truffle oil.",
      spiceOption: false,
      addons: [
        { name: "Extra Black Truffle Oil Drizzle", price: 80 },
        { name: "Prosciutto Di Parma Slices", price: 140 },
        { name: "Stuffed Cheese Crust", price: 150 }
      ]
    },
    {
      id: 20,
      name: "Tiger Brown Sugar Boba Tea",
      price: 260,
      image: bobaTea,
      category: "Beverages",
      rating: 4.9,
      prepTime: "5 min",
      description: "Handcrafted fresh milk tea infused with rich caramelized brown sugar tiger stripes, chewy slow-cooked tapioca pearls, and salted cheese foam.",
      spiceOption: false,
      addons: [
        { name: "Extra Tapioca Pearls", price: 30 },
        { name: "Egg Pudding Layer", price: 40 },
        { name: "Salted Cream Cheese Foam", price: 35 }
      ]
    },
    {
      id: 21,
      name: "Salmon & Tuna Sashimi Platter",
      price: 1100,
      image: sashimiPlatter,
      category: "Japanese",
      rating: 4.9,
      prepTime: "15 min",
      description: "Master-cut slices of fresh sashimi-grade Norwegian Atlantic salmon and Pacific bluefin tuna, served on ice with shiso leaves, grated wasabi, and pickled ginger.",
      spiceOption: false,
      addons: [
        { name: "Extra Salmon Slices (3 pcs)", price: 280 },
        { name: "Extra Fresh Wasabi", price: 40 },
        { name: "Ikura Salmon Roe", price: 180 }
      ]
    },
    {
      id: 22,
      name: "Sizzling Korean Samgyeopsal BBQ",
      price: 780,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
      category: "Korean",
      rating: 4.8,
      prepTime: "20 min",
      description: "Thick-cut grilled pork belly served sizzling with garlic cloves, sesame oil dipping sauce, spicy ssamjang paste, grilled kimchi, and crisp lettuce leaves.",
      spiceOption: true,
      addons: [
        { name: "Extra Pork Belly Strip", price: 220 },
        { name: "Garlic & Chili Ssam Set", price: 50 },
        { name: "Soybean Paste Stew (Doenjang)", price: 90 }
      ]
    },
    {
      id: 23,
      name: "Authentic Hainanese Chicken Rice",
      price: 540,
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop",
      category: "Pan Asian",
      rating: 4.7,
      prepTime: "15 min",
      description: "Tender poached chicken served over fragrant jasmine rice infused with chicken stock, ginger, and pandan leaves. Accompanied by homemade chili and garlic-soy sauces.",
      spiceOption: true,
      addons: [
        { name: "Extra Poached Chicken Portion", price: 160 },
        { name: "Aromatic Chicken Rice Upgrade", price: 40 },
        { name: "Clear Chicken Broth Bowl", price: 30 }
      ]
    },
    {
      id: 24,
      name: "Warm Matcha Green Tea Lava Cake",
      price: 360,
      image: "https://images.unsplash.com/photo-1617305855058-336d24456869?q=80&w=800&auto=format&fit=crop",
      category: "Desserts",
      rating: 4.9,
      prepTime: "12 min",
      description: "Warm Uji matcha green tea cake with a flowing molten chocolate center, served with a scoop of Madagascar vanilla bean ice cream.",
      spiceOption: false,
      addons: [
        { name: "Extra Vanilla Ice Cream Scoop", price: 60 },
        { name: "Sweet Azuki Red Bean Paste", price: 40 },
        { name: "Matcha Powder Drizzle", price: 25 }
      ]
    },
    {
      id: 25,
      name: "New York Wild Berry Cheesecake",
      price: 380,
      image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=800&auto=format&fit=crop",
      category: "Desserts",
      rating: 4.8,
      prepTime: "5 min",
      description: "Rich and velvety baked NY cheesecake on a graham cracker crust, drizzled with sweet wild blueberry & raspberry compote.",
      spiceOption: false,
      addons: [
        { name: "Extra Berry Compote", price: 35 },
        { name: "Whipped Cream Swirl", price: 30 },
        { name: "Chocolate Fudge Drizzle", price: 35 }
      ]
    },
    {
      id: 26,
      name: "Crispy Japanese Shrimp Tempura",
      price: 650,
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=800&auto=format&fit=crop",
      category: "Japanese",
      rating: 4.8,
      prepTime: "15 min",
      description: "Five golden jumbo tiger prawns lightly fried in crispy Japanese tempura batter, served with lotus root chips and warm tentsuyu ginger dipping sauce.",
      spiceOption: false,
      addons: [
        { name: "Extra Tempura Prawn (2 pcs)", price: 180 },
        { name: "Tempura Vegetable Mix", price: 80 },
        { name: "Extra Tentsuyu Dip", price: 25 }
      ]
    },
    {
      id: 27,
      name: "Korean Fresh Mango Bingsu",
      price: 420,
      image: "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?q=80&w=800&auto=format&fit=crop",
      category: "Desserts",
      rating: 4.9,
      prepTime: "10 min",
      description: "Fluffy snowfall shaved milk ice piled high with fresh sweet mango cubes, mango coulis, sweetened condensed milk, and creamy mango gelato.",
      spiceOption: false,
      addons: [
        { name: "Extra Mango Gelato Scoop", price: 70 },
        { name: "Condensed Milk Drizzle", price: 20 },
        { name: "Chewy Mochi Bits", price: 30 }
      ]
    },
    {
      id: 28,
      name: "Korean Brown Sugar Hotteok",
      price: 280,
      image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=800&auto=format&fit=crop",
      category: "Desserts",
      rating: 4.8,
      prepTime: "12 min",
      description: "Two golden crispy griddled street pancakes stuffed with a molten syrup of brown sugar, cinnamon, nutmeg, and crunchy crushed walnuts.",
      spiceOption: false,
      addons: [
        { name: "Add Honey Drizzle", price: 25 },
        { name: "Vanilla Bean Ice Cream Side", price: 60 },
        { name: "Extra Crushed Walnuts", price: 35 }
      ]
    },
    {
      id: 29,
      name: "Japanese Mochi Ice Cream Trio",
      price: 320,
      image: "https://images.unsplash.com/photo-1582293041079-7814c22966d7?q=80&w=800&auto=format&fit=crop",
      category: "Desserts",
      rating: 4.9,
      prepTime: "5 min",
      description: "Delicate soft rice dough wrapped around premium ice cream centers. Trio of Matcha Green Tea, Mango, and Sweet Strawberry.",
      spiceOption: false,
      addons: [
        { name: "Extra Mochi Piece", price: 90 },
        { name: "Whipped Cream & Cherry", price: 30 },
        { name: "Chocolate Drizzle", price: 20 }
      ]
    },
    {
      id: 30,
      name: "Classic Italian Tiramisu Cup",
      price: 390,
      image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=800&auto=format&fit=crop",
      category: "Desserts",
      rating: 4.9,
      prepTime: "5 min",
      description: "Authentic Venetian dessert made with espresso-soaked ladyfingers, velvety mascarpone cream, and topped with rich dark cocoa powder.",
      spiceOption: false,
      addons: [
        { name: "Shot of Espresso Drizzle", price: 45 },
        { name: "Extra Mascarpone Cream", price: 50 },
        { name: "Dark Chocolate Shavings", price: 30 }
      ]
    },
    {
      id: 31,
      name: "Triple Chocolate Lava Cake",
      price: 350,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop",
      category: "Desserts",
      rating: 4.8,
      prepTime: "10 min",
      description: "Warm dark chocolate sponge cake with a rich molten lava core that oozes on first bite. Served with vanilla gelato and fresh mint.",
      spiceOption: false,
      addons: [
        { name: "Vanilla Gelato Scoop", price: 60 },
        { name: "Warm Chocolate Fudge", price: 40 },
        { name: "Fresh Strawberries", price: 50 }
      ]
    },
    {
      id: 32,
      name: "Thai Coconut Mango Sticky Rice",
      price: 340,
      image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?q=80&w=800&auto=format&fit=crop",
      category: "Desserts",
      rating: 4.9,
      prepTime: "10 min",
      description: "Warm sweet glutinous rice cooked in rich salted coconut cream, paired with fresh sliced honey mango and toasted mung beans.",
      spiceOption: false,
      addons: [
        { name: "Extra Sweet Mango Half", price: 80 },
        { name: "Extra Coconut Sauce Drizzle", price: 25 },
        { name: "Toasted Sesame Seeds", price: 15 }
      ]
    },
    {
      id: 33,
      name: "Korean Sweet Banana Milk",
      price: 220,
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop",
      category: "Beverages",
      rating: 4.9,
      prepTime: "3 min",
      description: "Iconic Korean sweet creamy banana-infused milk served ice-cold, topped with fresh banana slice and a drizzle of caramel.",
      spiceOption: false,
      addons: [
        { name: "Add Chewy Tapioca Pearls", price: 30 },
        { name: "Extra Creamy Milk Foam", price: 25 },
        { name: "Caramel Drizzle", price: 20 }
      ]
    },
    {
      id: 34,
      name: "Japanese Ceremonial Iced Matcha Latte",
      price: 280,
      image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=800&auto=format&fit=crop",
      category: "Beverages",
      rating: 4.9,
      prepTime: "5 min",
      description: "Whisked Kyoto ceremonial grade Uji matcha layered with organic cold milk, Madagascar vanilla syrup, and a silky cream top.",
      spiceOption: false,
      addons: [
        { name: "Oat Milk Upgrade", price: 50 },
        { name: "Shot of Espresso (Dirty Matcha)", price: 45 },
        { name: "Sweet Red Bean Foam", price: 35 }
      ]
    },
    {
      id: 35,
      name: "Authentic Thai Iced Milk Tea",
      price: 240,
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop",
      category: "Beverages",
      rating: 4.8,
      prepTime: "4 min",
      description: "Traditional aromatic Thai spiced black tea brewed with star anise and cardamom, layered with sweet condensed milk over crushed ice.",
      spiceOption: false,
      addons: [
        { name: "Grass Jelly Topping", price: 30 },
        { name: "Condensed Milk Extra Swirl", price: 20 },
        { name: "Boba Pearls", price: 35 }
      ]
    },
    {
      id: 36,
      name: "Sparkling Yuzu Peach Fruit Soda",
      price: 250,
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop",
      category: "Beverages",
      rating: 4.8,
      prepTime: "4 min",
      description: "Bubbly sparkling soda infused with tangy Japanese yuzu citrus, sweet white peach jam, mint leaves, and a dehydrated citrus wheel.",
      spiceOption: false,
      addons: [
        { name: "Popping Peach Boba", price: 40 },
        { name: "Extra Yuzu Citrus Shot", price: 30 },
        { name: "Fresh Mint Sprig", price: 15 }
      ]
    },
    {
      id: 37,
      name: "Korean Fresh Strawberry Milk Jelly",
      price: 270,
      image: "https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=800&auto=format&fit=crop",
      category: "Beverages",
      rating: 4.9,
      prepTime: "5 min",
      description: "Chunky homemade fresh strawberry puree layered with cold whole milk, sweet strawberry syrup, and soft grass jelly bites.",
      spiceOption: false,
      addons: [
        { name: "Extra Strawberry Compote", price: 40 },
        { name: "Soft Coconut Jelly", price: 30 },
        { name: "Ice Cream Scoop Topping", price: 60 }
      ]
    },
    {
      id: 38,
      name: "Iced Vietnamese Sweet Egg Coffee",
      price: 290,
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop",
      category: "Beverages",
      rating: 4.9,
      prepTime: "6 min",
      description: "Robust dark roasted Vietnamese phin-filtered coffee topped with a thick whipped egg yolk and condensed milk cloud, dusted with cocoa.",
      spiceOption: false,
      addons: [
        { name: "Extra Whipped Egg Foam", price: 45 },
        { name: "Double Espresso Shot", price: 40 },
        { name: "Condensed Milk Drizzle", price: 20 }
      ]
    }
  ];

  // Filtering Logic
  const filteredFoods = foods.filter((food) => {
    const matchesCategory =
      selectedCategory === "All" ||
      food.category === selectedCategory ||
      (selectedCategory === "Asian" && (food.category === "Korean" || food.category === "Pan Asian" || food.category === "Asian" || food.category === "Japanese"));
    const matchesSearch =
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.category.toLowerCase().includes(searchQuery.toLowerCase());
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