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
  
  
  const [minPrice, setMinPrice] = useState(50);
  const [maxPrice, setMaxPrice] = useState(150);

 
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        localStorage.setItem("products", JSON.stringify(data));
      });
  }, []);

 
  useEffect(() => {
    const filtered = products.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice
    );
    setFilteredProducts(filtered);
  }, [minPrice, maxPrice, products]);

  return (
    <div>
      <h1>Products</h1>

      {}
      <label>
        Min Price: ${minPrice}
        <input
          type="range"
          min="0"
          max="200"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
        />
      </label>
      
      <label>
        Max Price: ${maxPrice}
        <input
          type="range"
          min="0"
          max="200"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
      </label>

      {}
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
