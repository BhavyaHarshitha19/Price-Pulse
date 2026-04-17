// api.js
// // const BASE_URL = "http://127.0.0.1:5000";

// // export const getPricePrediction = async (data) => {
// //     try {
// //         const response = await fetch(`${BASE_URL}/predict`, {
// //             method: "POST",
// //             headers: {
// //                 "Content-Type": "application/json"
// //             },
// //             body: JSON.stringify({
// //                 stock: Number(data.stock),
// //                 demand: Number(data.demand),
// //                 rarity: Number(data.rarity),
// //                 manufacturing_cost: Number(data.manufacturing_cost)
// //             })
// //         });

// //         const result = await response.json();
// //         return result;

// //     } catch (error) {
// //         console.error("API ERROR:", error);
// //         alert("Error connecting to backend");
// //         return null;
// //     }
// // };
// const BASE_URL = "http://127.0.0.1:5000";

// export const getPricePrediction = async (data) => {
//   try {
//     const response = await fetch(`${BASE_URL}/predict`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         stock: Number(data.stock),
//         demand: Number(data.demand),
//         rarity: Number(data.rarity),
//         manufacturing_cost: Number(data.manufacturing_cost),
//         product_name: data.product_name   // 🔥 THIS WAS MISSING
//       })
//     });

//     const result = await response.json();
//     return result;

//   } catch (error) {
//     console.error("API ERROR:", error);
//     alert("Error connecting to backend");
//     return null;
//   }
// };
const BASE_URL = "http://127.0.0.1:5000";

export const getPricePrediction = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const res = await response.json();

    // 🔥 ADD THIS HERE
    console.log("FULL RESPONSE:", res);
    console.log("PRODUCTS:", res.similar_products);

    return res;

  } catch (error) {
    console.error(error);
    alert("Backend not running!");
    return null;
  }
};