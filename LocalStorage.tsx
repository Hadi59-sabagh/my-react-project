import React, { useState, useEffect } from "react";

const API_URL = "https://fakestoreapi.com/products";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
      setFilteredProducts(JSON.parse(storedProducts));
    } else {
     
      fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setFilteredProducts(data);
          localStorage.setItem("products", JSON.stringify(data)); 
        });
    }
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {product.title} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
