// import Navbar from "../Components/Navbar";
// import SearchBar from "../Components/SearchBar";
// import FoodCard from "../Components/FoodCard";

// function Home({ cart, setCart }) {

//   const addToCart = (food) => {

//     const exist = cart.find(item => item.id === food.id);

//     if(exist){

//       setCart(
//         cart.map(item=>
//           item.id===food.id
//           ? {...item,quantity:item.quantity+1}
//           : item
//         )
//       );

//     }else{

//       setCart([
//         ...cart,
//         {
//           ...food,
//           quantity:1
//         }
//       ]);

//     }

//   };

//   return(
//     <>
//       <Navbar cart={cart}/>

//       <SearchBar/>

//       <FoodCard addToCart={addToCart}/>
//     </>
//   );
// }

// export default Home;


// function Home() {
//   return (
//     <>
//       hello
//     </>
//   );
// }

// export default Home;




import Navbar from "../Components/Navbar";
import SearchBar from "../Components/SearchBar";
import FoodCard from "../Components/FoodCard";
import "./Home.css";
import hero from "../assets/Restaurent.jpg";

function Home({ cart, setCart }) {

  const addToCart = (food) => {
    const exist = cart.find((item) => item.id === food.id);

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...food,
          quantity: 1,
        },
      ]);
    }
  };

  return (
    <>
      <Navbar cart={cart} />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-left">
          <h1>
            Welcome to
            <br />
            <span>Food Paradise</span>
          </h1>

          <p>
            Fresh Ingredients.
            <br />
            Amazing Taste.
            <br />
            Unforgettable Experience.
          </p>

          <div className="buttons-center">
            <button
              className="primary"
              onClick={() =>
                document
                  .getElementById("menu-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Menu
            </button>

            
          </div>
        </div>

        <div className="hero-right">
          <img src={hero} alt="Restaurant" />
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="box">
          🍕
          <h3>Fresh Food</h3>
          <p>Prepared every day with quality ingredients.</p>
        </div>

        <div className="box">
          👨‍🍳
          <h3>Professional Chefs</h3>
          <p>Experienced chefs creating memorable meals.</p>
        </div>

        <div className="box">
          🚚
          <h3>Fast Delivery</h3>
          <p>Hot and fresh food delivered quickly.</p>
        </div>
      </section>

      {/* Search */}
      <SearchBar />

      {/* Food Menu */}
      <section id="menu-section">
        <FoodCard addToCart={addToCart} />
      </section>
    </>
  );
}

export default Home;