// products.jsx
import React, { useState } from "react";
import { getPricePrediction } from "../services/api";
import { useLocation } from "react-router-dom";

function Pricing() {
  const location = useLocation();
  const product = location.state?.product;

  const [stock, setStock] = useState(product?.stock || "");
  const [cost, setCost] = useState(product?.price || "");
  const [rarity, setRarity] = useState("Low Rarity");
  const [demand, setDemand] = useState("Low Demand");

  const [price, setPrice] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  const rarityMap = {
    "Low Rarity": 20,
    "Medium Rarity": 50,
    "High Rarity": 80,
  };

  const demandMap = {
    "Low Demand": 20,
    "Medium Demand": 50,
    "High Demand": 80,
  };

  const handleSubmit = async () => {
    const data = {
      stock: Number(stock),
      demand: demandMap[demand],
      rarity: rarityMap[rarity],
      manufacturing_cost: Number(cost),
      product_name: product?.name   // ✅ FIXED
    };

    const res = await getPricePrediction(data);
    if (!res) return;

    setPrice(res.predicted_price);
    setSimilarProducts(res.similar_products || []);
  };

  return (
    <div style={{ padding: "30px", background: "#f4f7fb", minHeight: "100vh" }}>

      <h2>Dynamic Pricing</h2>
      <h3>Product: {product?.name}</h3>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>

        {/* LEFT CARD */}
        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "320px"
        }}>
          <h3>Pricing Parameters</h3>

          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Stock"
          /><br /><br />

          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="Manufacturing Cost"
          /><br /><br />

          <select value={rarity} onChange={(e) => setRarity(e.target.value)}>
            <option>Low Rarity</option>
            <option>Medium Rarity</option>
            <option>High Rarity</option>
          </select><br /><br />

          <select value={demand} onChange={(e) => setDemand(e.target.value)}>
            <option>Low Demand</option>
            <option>Medium Demand</option>
            <option>High Demand</option>
          </select><br /><br />

          <button onClick={handleSubmit}>
            Get Recommended Price
          </button>
        </div>

        {/* RIGHT CARD */}
        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "320px",
          textAlign: "center"
        }}>
          <h3>Recommended Price</h3>

          {price !== null ? (
            <h2 style={{ color: "green" }}>₹{price}</h2>
          ) : (
            <p>No result yet</p>
          )}
        </div>
      </div>

      {/* SIMILAR PRODUCTS */}
      {similarProducts.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3>Similar Products (Near Your Price)</h3>

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {similarProducts.map((p, i) => (
              <div key={i} style={{
                background: "white",
                padding: "10px",
                borderRadius: "10px",
                width: "200px"
              }}>
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ width: "100%", height: "150px", objectFit: "contain" }}
                />

                <p>{p.name}</p>
                <p><b>{p.price}</b></p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Pricing;