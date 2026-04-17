function PriceResult({ result }) {
  if (!result) return null;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-[300px]
                    border-t-4 border-green-600">
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        Price Recommendation
      </h3>

      <p className="text-gray-600 mb-2">
        Base Price: <span className="font-semibold">₹{result.basePrice}</span>
      </p>

      <p className="text-gray-600 mb-4">
        Adjustment: <span className="font-semibold">₹{result.adjustment}</span>
      </p>

      <div className="bg-green-100 text-green-700 text-center
                      py-3 rounded-lg text-2xl font-bold">
        ₹{result.finalPrice}
      </div>
    </div>
  );
}

export default PriceResult;
