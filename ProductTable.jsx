import axios from "axios";

function ProductTable({ products, setProducts }) {

  const handleGetPrice = async (product, index) => {

    try {

      const payload = {
        cost: product.price,
        stock: product.stock,
        competitor: product.price * 1.2,
        rarity: 1,
        season: 1
      };

      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        payload
      );

      const newPrice = response.data.recommended_price;

      // Update product price in table
      const updatedProducts = [...products];

      updatedProducts[index] = {
        ...product,
        price: newPrice,
        stock: product.stock - 1   // optional stock reduction
      };

      setProducts(updatedProducts);

    } catch (error) {
      console.error("Prediction error:", error);
    }

  };

  return (
    <div className="bg-white shadow rounded-xl mt-6 overflow-hidden">
      <table className="w-full">

        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="p-4 text-left">Product</th>
            <th className="p-4">Category</th>
            <th className="p-4">Price</th>
            <th className="p-4">Stock</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p, i) => (
            <tr key={i} className="border-t hover:bg-gray-50">

              <td className="p-4">{p.name}</td>

              <td className="p-4 text-center">{p.category}</td>

              <td className="p-4 text-center text-green-600 font-semibold">
                ₹{p.price}
              </td>

              <td className="p-4 text-center">{p.stock}</td>

              <td className="p-4 text-center">
                <button
                  onClick={() => handleGetPrice(p, i)}
                  className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
                >
                  Get Price
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default ProductTable;