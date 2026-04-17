// components/DashboardCards.jsx
function DashboardCards() {
  const cards = [
    { label: "Total Products", value: 120 },
    { label: "Low Stock Items", value: 8 },
    { label: "Avg Recommended Price", value: "₹850" },
    { label: "Price Updates Today", value: 15 },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mt-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <p className="text-gray-500 text-sm">{card.label}</p>
          <h2 className="text-2xl font-bold mt-2">{card.value}</h2>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;
