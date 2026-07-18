// import Navbar from "../Components/Navbar";


// function Orders({ cart , orders }) {
//   return (
//     <>
//       <Navbar cart={cart} />
//       <h1>Orders Page</h1>
//     </>
//   );
// }

// export default Orders;


import Navbar from "../Components/Navbar";

function Orders({ cart, orders }) {
  return (
    <>
      <Navbar cart={cart} />

      <div style={{ padding: "30px" }}>
        <h1>Order History</h1>

        {orders.length === 0 ? (
          <h2>No Orders Yet</h2>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              style={{
                border: "1px solid #ccc",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "10px",
              }}
            >
              <h3>{order.date}</h3>

              {order.items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    marginBottom: "15px",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    width="100"
                  />

                  <div>
                    <h3>{item.name}</h3>
                    <p>Price: Rs {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}

              <h2>Total Bill: Rs {order.total}</h2>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Orders;