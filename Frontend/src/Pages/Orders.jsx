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


// import Navbar from "../Components/Navbar";


// function Orders({ cart, orders }) {
//   return (
//     <>
//       <Navbar cart={cart} />

//       <div style={{ padding: "30px" }}>
//         <h1>Order History</h1>

//         {orders.length === 0 ? (
//           <h2>No Orders Yet</h2>
//         ) : (
//           orders.map((order) => (
//             <div
//               key={order.id}
//               style={{
//                 border: "1px solid #ccc",
//                 padding: "20px",
//                 marginBottom: "20px",
//                 borderRadius: "10px",
//               }}
//             >
//               <h3>{order.date}</h3>

//               {order.items.map((item) => (
//                 <div
//                   key={item.id}
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "20px",
//                     marginBottom: "15px",
//                   }}
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     width="100"
//                   />

//                   <div>
//                     <h3>{item.name}</h3>
//                     <p>Price: Rs {item.price}</p>
//                     <p>Quantity: {item.quantity}</p>
//                   </div>
//                 </div>
//               ))}

//               <h2>Total Bill: Rs {order.total}</h2>
//             </div>
//           ))
//         )}
//       </div>
//     </>
//   );
// }

// export default Orders;

import { FaCheckCircle, FaUtensils, FaMotorcycle, FaHome, FaClock } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import "./Orders.css";

function Orders({ cart, orders }) {
  const getStatusNumber = (status) => {
    switch (status) {
      case "Placed": return 1;
      case "Preparing": return 2;
      case "Out for Delivery": return 3;
      case "Delivered": return 4;
      default: return 1;
    }
  };

  const getStatusEstimatedTime = (status) => {
    switch (status) {
      case "Placed": return "Arriving in 35-45 mins";
      case "Preparing": return "Cooking your food (Arriving in 25-35 mins)";
      case "Out for Delivery": return "Rider on the way! (Arriving in 5-15 mins)";
      case "Delivered": return "Delivered! Enjoy your meal.";
      default: return "";
    }
  };

  return (
    <>
      <Navbar cart={cart} />

      <div className="orders-page">
        <div className="orders-header">
          <h1>Track Your Orders</h1>
          <p>Real-time updates from our kitchen to your doorstep.</p>
        </div>

        {orders.length === 0 ? (
          <div className="empty-orders-container animate-fade">
            <div className="empty-orders-graphic">🍱</div>
            <h2 className="empty-orders">No Orders Yet</h2>
            <p>Hungry? Place your order from the menu and track it here.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => {
              const currentStep = getStatusNumber(order.status);
              
              return (
                <div className="order-tracking-card animate-fade" key={order.id}>
                  {/* Card Header */}
                  <div className="order-card-header">
                    <div className="order-id-info">
                      <h3>Order #{order.id.toString().slice(-6)}</h3>
                      <span className="order-date-text">{order.date}</span>
                    </div>
                    <div className="order-status-badge-container">
                      <span className={`order-status-badge status-${order.status.toLowerCase().replace(/\s+/g, '')}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Delivery Countdown Banner */}
                  {order.status !== "Delivered" && (
                    <div className="delivery-time-banner">
                      <FaClock className="clock-banner-icon" />
                      <span>{getStatusEstimatedTime(order.status)}</span>
                    </div>
                  )}

                  {/* Visual Tracker Timeline */}
                  <div className="tracker-timeline-wrapper">
                    <div className="tracker-line">
                      <div 
                        className="tracker-line-fill" 
                        style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="tracker-steps">
                      <div className={`step-node ${currentStep >= 1 ? "active" : ""} ${currentStep > 1 ? "completed" : ""}`}>
                        <div className="step-circle">
                          {currentStep > 1 ? <FaCheckCircle /> : <span className="node-num">1</span>}
                        </div>
                        <span className="step-label">Placed</span>
                      </div>

                      <div className={`step-node ${currentStep >= 2 ? "active" : ""} ${currentStep > 2 ? "completed" : ""}`}>
                        <div className="step-circle">
                          {currentStep > 2 ? <FaCheckCircle /> : <FaUtensils className="step-node-icon" />}
                        </div>
                        <span className="step-label">Preparing</span>
                      </div>

                      <div className={`step-node ${currentStep >= 3 ? "active" : ""} ${currentStep > 3 ? "completed" : ""}`}>
                        <div className="step-circle">
                          {currentStep > 3 ? <FaCheckCircle /> : <FaMotorcycle className="step-node-icon" />}
                        </div>
                        <span className="step-label">On The Way</span>
                      </div>

                      <div className={`step-node ${currentStep >= 4 ? "active" : ""} ${currentStep > 4 ? "completed" : ""}`}>
                        <div className="step-circle">
                          {currentStep >= 4 ? <FaCheckCircle /> : <FaHome className="step-node-icon" />}
                        </div>
                        <span className="step-label">Delivered</span>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Accordion Info */}
                  <div className="order-details-grid">
                    {/* Left Sub-panel: Items */}
                    <div className="details-items-panel">
                      <h4 className="detail-sub-heading">Ordered Items</h4>
                      <div className="order-items-summary-list">
                        {order.items.map((item) => (
                          <div className="order-item-row" key={item.id}>
                            <img src={item.image} alt={item.name} className="item-thumbnail" />
                            <div className="item-info-summary">
                              <h5>{item.name} x {item.quantity}</h5>
                              {(item.spiceLevel || (item.addons && item.addons.length > 0)) && (
                                <p className="item-customizations-inline">
                                  {item.spiceLevel && <span>🌶️ {item.spiceLevel}</span>}
                                  {item.addons && item.addons.map(a => <span key={a.name}>+{a.name}</span>)}
                                </p>
                              )}
                            </div>
                            <span className="item-row-total">Rs {(item.customPrice || item.price) * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Sub-panel: Delivery & Payment Details */}
                    <div className="details-delivery-panel">
                      <h4 className="detail-sub-heading">Delivery Details</h4>
                      <div className="delivery-info-box">
                        <p><strong>Customer:</strong> {order.deliveryInfo?.name}</p>
                        <p><strong>Phone:</strong> {order.deliveryInfo?.phone}</p>
                        <p><strong>Address:</strong> {order.deliveryInfo?.address}</p>
                        <p><strong>Payment:</strong> {order.deliveryInfo?.paymentMethod}</p>
                      </div>

                      <div className="bill-summary-box">
                        <div className="bill-row">
                          <span>Subtotal</span>
                          <span>Rs {order.subtotal}</span>
                        </div>
                        <div className="bill-row">
                          <span>Delivery Fee</span>
                          <span>Rs {order.deliveryFee}</span>
                        </div>
                        <div className="bill-row">
                          <span>Tax (5%)</span>
                          <span>Rs {order.tax}</span>
                        </div>
                        <hr className="bill-divider" />
                        <div className="bill-row grand-total-row">
                          <span>Grand Total</span>
                          <span className="bill-total-amount">Rs {order.total}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default Orders;