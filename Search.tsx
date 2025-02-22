import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce"; 


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
  

  const [searchTerm, setSearchTerm] = useState("");

  
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        localStorage.setItem("products", JSON.stringify(data));
      });
  }, []);


  const handleSearch = useCallback(
    debounce((query) => {
      setFilteredProducts(
        products.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, 500), 
    [products]
  );

 
  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, handleSearch]);

  return (
    <div>
      <h1>Products</h1>

      {}
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />

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
