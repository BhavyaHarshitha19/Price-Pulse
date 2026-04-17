// dashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ LOAD FROM STORAGE
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved
      ? JSON.parse(saved)
      : [
          { name: "Shoes", price: 1200, stock: 20 },
          { name: "Headphones", price: 2500, stock: 10 }
        ];
  });

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: ""
  });

  // ✅ SAVE TO STORAGE
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // ✅ UPDATE FROM PRICING PAGE
  useEffect(() => {
    if (location.state?.updatedProduct !== undefined) {
      const updated = [...products];
      updated[location.state.index] = location.state.updatedProduct;
      setProducts(updated);
    }
  }, [location.state]);

  // ✅ ADD PRODUCT
  const addProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) return;

    const updated = [
      ...products,
      {
        name: newProduct.name,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock)
      }
    ];

    setProducts(updated);
    setNewProduct({ name: "", price: "", stock: "" });
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Price Pulse</h1>
      <h3 style={styles.subheading}>Product Dashboard</h3>

      {/* 🔥 ADD PRODUCT CARD */}
      <div style={styles.addCard}>
        <h3>Add New Product</h3>

        <input
          style={styles.input}
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />

        <input
          style={styles.input}
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />

        <input
          style={styles.input}
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) =>
            setNewProduct({ ...newProduct, stock: e.target.value })
          }
        />

        <button style={styles.primaryBtn} onClick={addProduct}>
          Add Product
        </button>
      </div>

      {/* 🔥 PRODUCT GRID */}
      <div style={styles.grid}>
        {products.map((p, i) => (
          <div key={i} style={styles.card}>
            <h3>{p.name}</h3>
            <p><b>Price:</b> ₹{p.price}</p>
            <p><b>Stock:</b> {p.stock}</p>

            <button
              style={styles.secondaryBtn}
              onClick={() =>
                navigate("/pricing", {
                  state: { product: p, index: i }
                })
              }
            >
              Update Price
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

const styles = {
  page: {
    background: "#eef2f7",
    minHeight: "100vh",
    padding: "30px"
  },
  heading: {
    marginBottom: "5px"
  },
  subheading: {
    color: "#555",
    marginBottom: "20px"
  },
  addCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "15px",
    width: "320px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: "30px"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },
  primaryBtn: {
    width: "100%",
    padding: "10px",
    background: "#2f8f9d",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },
  grid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap"
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "15px",
    width: "250px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  secondaryBtn: {
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    background: "#2f8f9d",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};