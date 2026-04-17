//login.jsx
import { useNavigate } from "react-router-dom";
import logo from "../assets/pulse-logo.png";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-br from-cyan-100 to-slate-200">

      <div className="bg-white p-10 rounded-xl shadow-xl w-[420px]">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="Pulse Logo"
            className="w-48"
          />
        </div>

        {/* Tagline */}
        <p className="text-center text-slate-500 mb-6">
          Smart Dynamic Pricing Platform for Sellers
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-2 rounded
                       focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-2 rounded
                       focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-cyan-600 text-white py-2 rounded
                       hover:bg-cyan-700"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;
