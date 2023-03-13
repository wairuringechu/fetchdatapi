import React, { useEffect, useState, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// Create a context for the products data
const ProductsContext = React.createContext();

function ProductsProvider({ children, products }) {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    const categories = products.map((p) => p.category);
    const categoriesArr = Array.from(new Set(categories));
    setCategories(categoriesArr);
  }, [products]);
  
  // Expose the products data in the context provider value
  const value= { categories };
  
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

function ProductsLayout() {
  return (
    <div>
      <div className="productsLayout">
        <div>
          <Categories />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

function Categories() {
  // Consume the products data from the context
  const { categories } = useContext(ProductsContext);
  
  const navigate = useNavigate();
  
  const handleCategoryNavigation = (category) => {
    navigate(`/products/${category}`);
  };
  
  return (
    <div className="categories">
      {categories.map((category, index) => {
        return (
          <span
            className="category"
            key={index}
            onClick={() => handleCategoryNavigation(category)}
          >
            {category}
          </span>
        );
      })}
    </div>
  );
}

export { ProductsProvider, ProductsLayout,Categories};
