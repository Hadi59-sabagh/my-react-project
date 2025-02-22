import React, { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";  

const API_URL = "https://fakestoreapi.com/products";

export default function App() {
  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([50, 150]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

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
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // استفاده از debounce
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

  useEffect(() => {
    setFilteredProducts(
      products.filter(
        (p) =>
          p.price >= priceRange[0] &&
          p.price <= priceRange[1] &&
          (category === "all" || p.category === category)
      )
    );
  }, [priceRange, category, products]);

  useEffect(() => {
    if (selectedProduct) {
      setSimilarProducts(
        products.filter((p) => p.category === selectedProduct.category && p.id !== selectedProduct.id)
      );
    }
  }, [selectedProduct, products]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((p) => p.id !== id));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All</option>
        {[...new Set(products.map((p) => p.category))].map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <input
        type="range"
        min="50"
        max="150"
        value={priceRange[0]}
        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
      />
      <input
        type="range"
        min="50"
        max="150"
        value={priceRange[1]}
        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
      />
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {product.title} - ${product.price}
            <button onClick={() => addToCart(product)}>Add to Cart</button>
            <button onClick={() => setSelectedProduct(product)}>View Similar</button>
          </li>
        ))}
      </ul>
      {selectedProduct && (
        <div>
          <h2>Similar Products</h2>
          <ul>
            {similarProducts.map((product) => (
              <li key={product.id}>{product.title} - ${product.price}</li>
            ))}
          </ul>
        </div>
      )}
      <h2>Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.title} - ${item.price}
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
