// // import "./Navbar.css";
// // import { Link } from "react-router-dom";
// // import { FaShoppingCart } from "react-icons/fa";

// // function Navbar({ cart }) {
// //   return (
// //     <nav className="navbar">

// //       <h2>🍽 Restaurant</h2>

// //       <ul className="nav-links">
// //         <li><Link to="/">Home</Link></li>
// //         <li><Link to="/menu">Menu</Link></li>
// //         <li><Link to="/orders">Orders</Link></li>
// //       </ul>

// //       <Link to="/cart">
// //         <button className="cartBtn">
// //           <FaShoppingCart />
// //           {" "}Cart ({cart?.length || 0})
// //         </button>
// //       </Link>

// //     </nav>
// //   );
// // }

// // export default Navbar;



// import logo from "../assets/Logo.jpg";
// import { Link } from "react-router-dom";

// function Navbar( ) {
//   return (
//     <nav className="navbar">
//       <img src={logo} alt="Logo" className="logo" />

//       <div>
//         <Link to="/">Home</Link>
//         <Link to="/menu">Menu</Link>
//         <Link to="/cart">Cart</Link>
//         <Link to="/orders">Orders</Link>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;




import { NavLink } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import "./Navbar.css";

function Navbar({ cart = [] }) {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="logo-container">
        <NavLink to="/" className="logo-link">
          <span className="logo-emoji">🍽️</span>
          <span className="logo-text">Food<span className="logo-highlight">Paradise</span></span>
        </NavLink>
      </div>

      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Home
        </NavLink>

        <NavLink to="/menu" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Menu
        </NavLink>

        <NavLink to="/orders" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Orders
        </NavLink>

        <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-link cart-link-btn active" : "nav-link cart-link-btn"}>
          <div className="cart-icon-wrapper">
            <FaShoppingBag className="cart-icon" />
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </div>
          <span className="cart-text">Cart</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;