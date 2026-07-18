import "./Cart.css";

function Cart({ cart, setCart, orders, setOrders }) {

  const increaseQty = (id) => {
    setCart(
      cart.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const confirmOrder = () => {

    if(cart.length===0){
      alert("Your cart is empty!");
      return;
    }

    // Add the order to the orders list
  setOrders((prevOrders) => [
    ...prevOrders,
    {
      id: Date.now(),
      items: [...cart],
      total: total,
      date: new Date().toLocaleString(),
    },
  ]);

    alert(
`Order Confirmed!

Total Bill: Rs ${total}

Thank you for ordering.`
    );

    setCart([]);
  };

  return (

    <div className="cart-container">

      <h1>Your Cart</h1>

      {cart.length===0 ? (

        <p className="empty">
          Cart is Empty
        </p>

      ):(

        <>
          {cart.map(item=>(

            <div
            className="cart-item"
            key={item.id}
            >

              <img
              src={item.image}
              alt={item.name}
              />

              <div className="details">

                <h2>{item.name}</h2>

                <p>Rs {item.price}</p>

                <div className="qty">

                  <button
                  onClick={()=>decreaseQty(item.id)}
                  >
                    -
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                  onClick={()=>increaseQty(item.id)}
                  >
                    +
                  </button>

                </div>

              </div>

              <button
              className="remove"
              onClick={()=>removeItem(item.id)}
              >
                Remove
              </button>

            </div>

          ))}

          <hr />

          <h2 className="bill">
            Total Bill : Rs {total}
          </h2>

          <button
          className="confirm"
          onClick={confirmOrder}
          >
            Confirm Order
          </button>

        </>

      )}

    </div>

  );
}

export default Cart;