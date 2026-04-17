// components/Sidebar.jsx
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-56 bg-white shadow-md p-5">
      <nav className="space-y-4 font-medium">
        <Link className="block text-gray-700 hover:text-indigo-600" to="/dashboard">Dashboard</Link>
        <Link className="block text-gray-700 hover:text-indigo-600" to="/products">Products</Link>
        <Link className="block text-gray-700 hover:text-indigo-600" to="/pricing">Pricing</Link>
        <Link className="block text-gray-700 hover:text-indigo-600" to="/analytics">Analytics</Link>
      </nav>
    </div>
  );
}

export default Sidebar;
