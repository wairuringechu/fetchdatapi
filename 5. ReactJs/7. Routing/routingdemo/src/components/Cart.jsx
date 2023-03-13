import { createContext, useContext, useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import "./Cart.css";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import OneProduct from "./components/OneProduct";
import Products from "./components/Products";
import ProductsDisplay from "./components/ProductsDisplay";
import { products } from "./data";

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.payload];
    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload.id);
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
}

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const categories = products.map((p) => p.category);

    const categoriesArr = Array.from(new Set(categories));
    setCategories(categoriesArr);
  }, [products]);

  const [cartItems, dispatch] = useReducer(cartReducer, []);

  const addToCart = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeFromCart = (item) => {
    dispatch({ type: "REMOVE_ITEM", payload: item });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      <div className="App">
        <Navbar />
        <Routes>
          <Route path={"/products"} element={<Products products={products} />}>
            <Route
              index
              element={<ProductsDisplay products={products} category={"all"} />}
            />
            {/*map() method is used on the categories array to render a nested Route component for each category.*/}
            {categories.length > 0 &&
              categories.map((c) => {
                return (
                  <Route
                    key={c}
                    path={`${c}`}
                    element={<ProductsDisplay category={c} />}
                  />
                );
              })}
          </Route>
          <Route
            path="/products/:id"
            element={<OneProduct products={products} />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </CartContext.Provider>
  );
}
//cart functionality

function Cart() {
    const { cartItems, addToCart, removeFromCart, clearCart } =
      useContext(CartContext);
  
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);
  
    return (
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p>My cart is empty</p>
        ) : (
          <>
          {/*rendering the items in the cart and calculating the total price. */}
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <button onClick={() => removeFromCart(item)}>Remove</button>
                  </div>
                  <div>
                    {/* using to.Fixed()method returns the price of the item rounded off to 2dp*/}
                    <p>${item.price.toFixed()}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="total">
              <h4>Total: ${total.toFixed()}</h4>
            </div>
          </>
        )}
      </div>
    );
  }
  export default App;
