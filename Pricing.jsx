// pricing.jsx
import React, { useState } from "react";
import { getPricePrediction } from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";

function Pricing() {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;
  const index = location.state?.index;

  const [stock, setStock] = useState(product?.stock || "");
  const [cost, setCost] = useState(product?.price || "");
  const [rarity, setRarity] = useState("Low Rarity");
  const [demand, setDemand] = useState("Low Demand");

  const [price, setPrice] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);

  // 🔥 Mapping values
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

  // 🚀 API CALL
  const handleSubmit = async () => {
  const data = {
    stock: Number(stock),
    demand: demandMap[demand],
    rarity: rarityMap[rarity],
    manufacturing_cost: Number(cost),
    product_name: product?.name || "product"
  };

  const res = await getPricePrediction(data);
  if (!res) return;

  console.log("RES:", res);

  setPrice(res.predicted_price || res.recommended_price);
  setSimilarProducts(res.similar_products || []);
};
  // const handleSubmit = async () => {
  //   const data = {
  //     stock: Number(stock),
  //     demand: demandMap[demand],
  //     rarity: rarityMap[rarity],
  //     manufacturing_cost: Number(cost),
  //     product_name: product?.name, // IMPORTANT
  //   };

  //   const res = await getPricePrediction(data);
  //   if (!res) return;

  //   setPrice(res.predicted_price);

  //   // 🔥 TAKE ONLY TOP 5 PRODUCTS
  //   const topProducts = (res.similar_products || []).slice(0, 5);
  //   setSimilarProducts(topProducts);
  // };

  return (
    <div style={{ padding: "30px", background: "#f4f7fb", minHeight: "100vh" }}>
      
      <h2>Dynamic Pricing</h2>
      <h3 style={{ color: "#555" }}>Product: {product?.name}</h3>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>

        {/* LEFT CARD */}
        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "320px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <h3>Pricing Parameters</h3>

          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Stock"
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />

          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="Manufacturing Cost"
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />

          <select
            value={rarity}
            onChange={(e) => setRarity(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          >
            <option>Low Rarity</option>
            <option>Medium Rarity</option>
            <option>High Rarity</option>
          </select>

          <select
            value={demand}
            onChange={(e) => setDemand(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          >
            <option>Low Demand</option>
            <option>Medium Demand</option>
            <option>High Demand</option>
          </select>

          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              padding: "10px",
              background: "#1f8a9e",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Get Recommended Price
          </button>
        </div>

        {/* RIGHT CARD */}
        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          width: "320px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          textAlign: "center"
        }}>
          <h3>Recommended Price</h3>

          {price !== null ? (
            <>
              <h2 style={{ color: "green" }}>₹{price}</h2>

              <button
                onClick={() =>
                  navigate("/dashboard", {
                    state: {
                      updatedProduct: {
                        ...product,
                        price: price,
                      },
                      index: index,
                    },
                  })
                }
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  background: "green",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Apply Price & Go Back
              </button>
            </>
          ) : (
            <p>No result yet</p>
          )}
        </div>
      </div>

      {/* 🔥 SIMILAR PRODUCTS */}
      {/* 🔥 SIMILAR PRODUCTS */}
{similarProducts.length > 0 && (
  <div style={{ marginTop: "30px" }}>
    <h3>Top 3 Similar Products</h3>

    {similarProducts.map((p, i) => (
      <div
        key={i}
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "15px",
          background: "white",
          padding: "10px",
          borderRadius: "8px",
          alignItems: "center"
        }}
      >
        {/* IMAGE */}
        <img
          src={p.image}
          alt="product"
          width="80"
          style={{ borderRadius: "6px" }}
        />

        {/* DETAILS */}
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: 0 }}>{p.name}</h4>
          <p style={{ margin: "5px 0" }}>{p.price}</p>
        </div>

        {/* 🔥 BUTTON (IMPORTANT FIX) */}
        <button
          onClick={() => window.open(p.link, "_blank")}
          style={{
            background: "#1f8a9e",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          View
        </button>
      </div>
    ))}
  </div>
)}
    </div>
  );
}

export default Pricing;

