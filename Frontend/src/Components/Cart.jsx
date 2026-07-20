import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus, FaArrowLeft, FaCreditCard, FaTruck, FaMoneyBillWave, FaSpinner } from "react-icons/fa";
import "./Cart.css";

function Cart({ cart, setCart, orders, setOrders }) {
  const navigate = useNavigate();
  const [isCheckout, setIsCheckout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.customPrice || item.price) * item.quantity,
    0
  );

  const deliveryFee = subtotal > 0 ? 50 : 0;
  const tax = Math.round(subtotal * 0.05); // 5% VAT
  const total = subtotal + deliveryFee + tax;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert("Please fill in all delivery details.");
      return;
    }

    if (paymentMethod === "Card" && (!cardNumber || !cardExpiry || !cardCvv)) {
      alert("Please fill in card details.");
      return;
    }

    // Start payment processing simulation
    setIsProcessing(true);
    setProcessingStep(1);

    setTimeout(() => {
      setProcessingStep(2); // Securing channel...
      setTimeout(() => {
        setProcessingStep(3); // Placing order...
        setTimeout(() => {
          // Add Order to history
          const newOrder = {
            id: Date.now(),
            items: [...cart],
            subtotal: subtotal,
            deliveryFee: deliveryFee,
            tax: tax,
            total: total,
            date: new Date().toLocaleString(),
            status: "Placed",
            deliveryInfo: {
              name,
              phone,
              address,
              paymentMethod: paymentMethod === "COD" ? "Cash on Delivery" : "Credit Card"
            },
            statusHistory: [
              { status: "Placed", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
            ]
          };

          setOrders((prevOrders) => [newOrder, ...prevOrders]);
          
          // Clear cart
          setCart([]);
          setIsProcessing(false);
          setIsCheckout(false);
          
          // Redirect to orders
          navigate("/orders");
        }, 1200);
      }, 1200);
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container empty-state">
        <div className="empty-cart-card">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Browse our menu and add delicious food to your cart.</p>
          <Link to="/menu" className="browse-menu-btn">
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      {/* Processing Loader Modal */}
      {isProcessing && (
        <div className="processing-overlay">
          <div className="processing-card">
            <FaSpinner className="spinner-icon" />
            <h3>
              {processingStep === 1 && "Verifying Payment..."}
              {processingStep === 2 && "Securing Order Line..."}
              {processingStep === 3 && "Kitchen Confirming Order..."}
            </h3>
            <p>Please do not refresh or close this page.</p>
            <div className="progress-bar-container">
              <div className={`progress-bar-fill step-${processingStep}`}></div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Page Headers */}
      <div className="cart-header">
        <h1 className="cart-title-main">Checkout Details</h1>
        <div className="checkout-steps">
          <span className={`step-badge ${!isCheckout ? "active" : ""}`}>
            1. Review Bag
          </span>
          <span className="step-arrow">&rarr;</span>
          <span className={`step-badge ${isCheckout ? "active" : ""}`}>
            2. Payment & Delivery
          </span>
        </div>
      </div>

      <div className="cart-grid-layout">
        {/* Left Panel */}
        <div className="cart-left-panel">
          {!isCheckout ? (
            // REVIEW BAG VIEW
            <div className="review-bag-section">
              <h2 className="section-title-sub">Items in Cart</h2>
              <div className="cart-items-list">
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img src={item.image} alt={item.name} />

                    <div className="details">
                      <h2 className="item-name">{item.name}</h2>
                      
                      {/* Customization Details */}
                      {(item.spiceLevel || (item.addons && item.addons.length > 0)) && (
                        <div className="item-customizations-list">
                          {item.spiceLevel && (
                            <span className="cust-pill spice">🌶️ {item.spiceLevel}</span>
                          )}
                          {item.addons && item.addons.map((a) => (
                            <span className="cust-pill addon" key={a.name}>+{a.name}</span>
                          ))}
                        </div>
                      )}

                      <p className="item-price">Rs {item.customPrice || item.price}</p>
                    </div>

                    <div className="qty-controls-wrapper">
                      <div className="qty-selector-cart">
                        <button onClick={() => decreaseQty(item.id)}>
                          <FaMinus />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increaseQty(item.id)}>
                          <FaPlus />
                        </button>
                      </div>

                      <button
                        className="remove-item-btn"
                        onClick={() => removeItem(item.id)}
                        title="Remove Item"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="back-btn-container">
                <Link to="/menu" className="back-to-menu-btn">
                  <FaArrowLeft /> Add more items
                </Link>
              </div>
            </div>
          ) : (
            // PAYMENT AND DELIVERY FORM VIEW
            <div className="delivery-form-section">
              <button className="back-to-cart-btn" onClick={() => setIsCheckout(false)}>
                <FaArrowLeft /> Back to cart overview
              </button>

              <h2 className="section-title-sub">Delivery Information</h2>
              <form onSubmit={handlePlaceOrder} className="checkout-form">
                <div className="form-group">
                  <label htmlFor="fullname">Full Name</label>
                  <input
                    type="text"
                    id="fullname"
                    placeholder="E.g. Jhon Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="E.g. 01712345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Full Delivery Address</label>
                  <textarea
                    id="address"
                    rows="3"
                    placeholder="Apartment, building, street name, area..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  ></textarea>
                </div>

                <h2 className="section-title-sub" style={{ marginTop: "30px" }}>
                  Payment Method
                </h2>

                <div className="payment-options">
                  <label className={`payment-option-label ${paymentMethod === "COD" ? "active" : ""}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={() => setPaymentMethod("COD")}
                    />
                    <FaMoneyBillWave className="pay-icon" />
                    <span>Cash on Delivery</span>
                  </label>

                  <label className={`payment-option-label ${paymentMethod === "Card" ? "active" : ""}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="Card"
                      checked={paymentMethod === "Card"}
                      onChange={() => setPaymentMethod("Card")}
                    />
                    <FaCreditCard className="pay-icon" />
                    <span>Credit / Debit Card</span>
                  </label>
                </div>

                {paymentMethod === "Card" && (
                  <div className="card-input-simulation animate-fade">
                    <div className="form-group">
                      <label htmlFor="card-number">Card Number</label>
                      <input
                        type="text"
                        id="card-number"
                        placeholder="4111 2222 3333 4444"
                        maxLength="19"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group half">
                        <label htmlFor="expiry">Expiry Date</label>
                        <input
                          type="text"
                          id="expiry"
                          placeholder="MM/YY"
                          maxLength="5"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group half">
                        <label htmlFor="cvv">CVV</label>
                        <input
                          type="password"
                          id="cvv"
                          placeholder="123"
                          maxLength="3"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button type="submit" className="place-order-submit-btn">
                  Place Order (Rs {total})
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Right Panel (Order Summary) */}
        <div className="cart-right-panel">
          <div className="order-summary-card">
            <h2 className="summary-title">Summary</h2>
            
            <div className="summary-row">
              <span>Items Total</span>
              <span>Rs {subtotal}</span>
            </div>
            
            <div className="summary-row">
              <span className="flex-align-center">
                <FaTruck style={{ marginRight: "6px" }} /> Delivery Fee
              </span>
              <span>Rs {deliveryFee}</span>
            </div>
            
            <div className="summary-row">
              <span>Taxes (5%)</span>
              <span>Rs {tax}</span>
            </div>
            
            <hr className="summary-divider" />
            
            <div className="summary-row total-row">
              <span>Grand Total</span>
              <span className="total-price-text">Rs {total}</span>
            </div>

            {!isCheckout ? (
              <button
                className="proceed-checkout-btn"
                onClick={() => setIsCheckout(true)}
              >
                Proceed to Checkout
              </button>
            ) : (
              <p className="secure-checkout-tag">
                🔒 Secure SSL Checkout & Payment
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;