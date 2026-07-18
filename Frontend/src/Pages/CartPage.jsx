import Navbar from "../Components/Navbar";
import Cart from "../Components/Cart";

function CartPage({ cart, setCart,orders , setOrders}) {

    return(
        <>
            <Navbar cart={cart}/>
            <Cart
                cart={cart}
                setCart={setCart}
                orders={orders}
                setOrders={setOrders}
            />
        </>
    );
}

export default CartPage;