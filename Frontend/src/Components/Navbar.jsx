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




import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ cart = [] }) {
  return (
    <nav className="navbar">

      <div className="Logo">
        <h2>🍽️ Food Paradise</h2>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/menu">Menu</Link>

        <Link to="/cart">
          Cart ({cart.length})
        </Link>

        <Link to="/orders">Orders</Link>
      </div>

    </nav>
  );
}

export default Navbar;