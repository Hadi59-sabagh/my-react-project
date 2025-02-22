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
  

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

 
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
    if (selectedProduct) {
      const relatedProducts = products.filter(
        (p) => p.category === selectedProduct.category && p.id !== selectedProduct.id
      );
      setSimilarProducts(relatedProducts);
    }
  }, [selectedProduct, products]);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {product.title} - ${product.price}
            <button onClick={() => setSelectedProduct(product)}>View Similar</button>
          </li>
        ))}
      </ul>

      {}
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
    </div>
  );
}
