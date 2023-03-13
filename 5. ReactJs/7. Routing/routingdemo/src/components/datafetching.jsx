import React, { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  let [products, setProducts] = useState([]);
  
  useEffect(() => {
    const getProducts = async () => {
      try {
        let response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products);
      } catch (error) {
        console.log("This is the error", error);
      }
    };
    getProducts();
  }, []);

  return (
    <div>
      {products && products.length > 0 ? (
        products.map((p) => {
          return <h3>{p.name}</h3>;
        })
      ) : (
        <h1>products available</h1>
      )}
    </div>
  );
}

export default Products;
