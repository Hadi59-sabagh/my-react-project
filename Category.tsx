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
  const [category, setCategory] = useState<string>("all"); 

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


  useEffect(() => {
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === category));
    }
  }, [category, products]);

  return (
    <div>
      <h1>Products</h1>

      {}
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All</option>
        {[...new Set(products.map((p) => p.category))].map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

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
