import Navbar from "../Components/Navbar";
import FoodCard from "../Components/FoodCard";

function Menu({ cart, setCart }) {
  const addToCart = (food) => {
    const exist = cart.find((item) => item.id === food.id);

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === food.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
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

      <FoodCard addToCart={addToCart} />
    </>
  );
}

export default Menu;