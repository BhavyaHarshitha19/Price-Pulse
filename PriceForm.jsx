function PriceForm({ onCalculate }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        onCalculate(data);
      }}
      className="bg-white p-8 rounded-2xl shadow-lg w-[380px] border-t-4 border-indigo-600"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        Pricing Inputs
      </h3>

      {/* Manufacturing Cost */}
      <label className="block text-sm font-medium text-gray-600 mb-1">
        Manufacturing Cost
      </label>
      <input
        name="cost"
        type="number"
        placeholder="e.g. 500"
        className="w-full border border-gray-300 rounded-lg p-2 mb-4
                   focus:ring-2 focus:ring-indigo-500 outline-none"
      />

      {/* Current Stock */}
      <label className="block text-sm font-medium text-gray-600 mb-1">
        Current Stock
      </label>
      <input
        name="stock"
        type="number"
        placeholder="e.g. 20"
        className="w-full border border-gray-300 rounded-lg p-2 mb-4
                   focus:ring-2 focus:ring-indigo-500 outline-none"
      />

      {/* Competitor Price */}
      <label className="block text-sm font-medium text-gray-600 mb-1">
        Competitor Price
      </label>
      <input
        name="competitorPrice"
        type="number"
        placeholder="e.g. 750"
        className="w-full border border-gray-300 rounded-lg p-2 mb-4
                   focus:ring-2 focus:ring-indigo-500 outline-none"
      />

      {/* Rarity */}
      <label className="block text-sm font-medium text-gray-600 mb-1">
        Product Rarity
      </label>
      <select
        name="rarity"
        className="w-full border border-gray-300 rounded-lg p-2 mb-4
                   focus:ring-2 focus:ring-indigo-500 outline-none"
      >
        <option value="low">Low Rarity</option>
        <option value="medium">Medium Rarity</option>
        <option value="high">High Rarity</option>
      </select>

      {/* Demand */}
      <label className="block text-sm font-medium text-gray-600 mb-1">
        Seasonal Demand
      </label>
      <select
        name="season"
        className="w-full border border-gray-300 rounded-lg p-2 mb-6
                   focus:ring-2 focus:ring-indigo-500 outline-none"
      >
        <option value="low">Low Demand</option>
        <option value="normal">Normal Demand</option>
        <option value="high">High Demand</option>
      </select>

      {/* Button */}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-lg
                   font-semibold hover:bg-indigo-700 transition"
      >
        Get Price Recommendation
      </button>
    </form>
  );
}

export default PriceForm;
