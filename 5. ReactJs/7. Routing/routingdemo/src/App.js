import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
// import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import OneProduct from "./components/OneProduct";
import Products from "./components/Products";
import ProductsDisplay from "./components/ProductsDisplay";
import Cart from "./components/Cart"; 
import { products } from "./data";

function App() {
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]); 

  useEffect(() => {
    const categories = products.map((p) => p.category);

    const categoriesArr = Array.from(new Set(categories));
    setCategories(categoriesArr);
  }, [products]);

  // function to update cart items
  function handleAddToCart(item) {
    setCartItems([...cartItems, item]);
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/products"} element={<Products products={products} />}>
          <Route
            index
            element={<ProductsDisplay products={products} category={"all"} />}
          />
          {categories.length > 0 &&
            categories.map((c) => {
              return (
                <Route
                  key={c}
                  path={`/${c}`}
                  element={
                    <ProductsDisplay
                      products={products}
                      category={`${c}`}
                      handleAddToCart={handleAddToCart}
                    />
                  }
                />
              );
            })}
        </Route>
        <Route
          path="/products/:id"
          element={<OneProduct products={products} handleAddToCart={handleAddToCart} />} 
        />
        <Route
          path="/cart"
          element={<Cart cartItems={cartItems} />} 
        />
      </Routes>
    </div>
  );
}

export default App;
