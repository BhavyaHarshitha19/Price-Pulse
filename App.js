// // // src/App.js
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import Login from "./pages/Login";
// // import Dashboard from "./pages/Dashboard";
// // import Products from "./pages/Products";
// // import Pricing from "./pages/Pricing";
// // function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/" element={<Login />} />
// //         <Route path="/dashboard" element={<Dashboard />} />
// //         <Route path="/products" element={<Products />} />
// //         <Route path="/pricing" element={<Pricing />} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;
// import React, { useState } from "react";
// import { getPricePrediction } from "./services/api";
// import "./App.css";

// function App() {
//   const [stock, setStock] = useState("");
//   const [demand, setDemand] = useState("");
//   const [rarity, setRarity] = useState("");
//   const [cost, setCost] = useState("");

//   const [price, setPrice] = useState(null);
//   const [products, setProducts] = useState([]);

//   const handleSubmit = async () => {
//   const data = {
//     stock: Number(stock),
//     demand: Number(demand),
//     rarity: Number(rarity),
//     manufacturing_cost: Number(cost),
//   };

//   const res = await getPricePrediction(data);

//   if (!res) return;   // 🔥 ADD THIS LINE

//   setPrice(res.predicted_price);
//   setProducts(res.similar_products || []);
// };

//     const res = await getPricePrediction(data);

//     setPrice(res.predicted_price);
//     setProducts(res.similar_products || []);
//   };

//   return (
//     <div className="container">
//       <h1>Dynamic Price Predictor</h1>

//       <input placeholder="Stock" onChange={(e) => setStock(e.target.value)} />
//       <input placeholder="Demand" onChange={(e) => setDemand(e.target.value)} />
//       <input placeholder="Rarity" onChange={(e) => setRarity(e.target.value)} />
//       <input placeholder="Manufacturing Cost" onChange={(e) => setCost(e.target.value)} />

//       <button onClick={handleSubmit}>Predict</button>

//       {price && <h2>Price: ₹{price}</h2>}

//       {products.length > 0 && (
//         <>
//           <h3>Similar Products</h3>
//           <ul>
//             {products.map((p, i) => (
//               <li key={i}>{p.name} - {p.price}</li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Pricing from "./pages/Pricing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </Router>
  );
}

export default App;