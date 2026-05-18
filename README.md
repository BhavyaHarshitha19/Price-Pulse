# 💡 Price Pulse — AI-Powered Dynamic Pricing Platform

> Price smarter. Sell better. Let the AI do the math.

Price Pulse is a full-stack dynamic pricing platform that uses a trained **Random Forest ML model** to recommend the optimal selling price for any product — based on manufacturing cost, stock levels, demand, rarity, and quantity.

---

## 🚀 Live Demo Flow

1. Open the dashboard → add your product
2. Click **"Get AI Price"**
3. The ML model returns a recommended price in under a second
4. Click **"Apply Price"** → price updates live on the dashboard

---

## 🧠 How the AI Works

The model was trained on **918 real Flipkart products** using a pricing formula that accounts for:

| Factor | Effect on Price |
|---|---|
| High demand | ↑ Price goes up (up to +40%) |
| High rarity | ↑ Price goes up (up to +25%) |
| High stock | ↓ Price goes down (up to -12%) |
| Manufacturing cost | Base anchor for all pricing |

**Algorithm:** Random Forest Regressor (200 trees)
**Accuracy:** R² = 98.7% on test set
**Prediction time:** < 1 second

---

## 🏗️ Architecture

```
price-pulse/
├── backend/
│   ├── app.py               Flask REST API
│   ├── price_model.pkl      Trained Random Forest model
│   └── requirements.txt     Python dependencies
│
├── src/
│   ├── pages/
│   │   ├── Home.jsx         Landing page
│   │   ├── Login.jsx        Auth page (demo)
│   │   ├── Dashboard.jsx    Product management + live prices
│   │   └── Pricing.jsx      AI price recommendation form
│   ├── services/
│   │   └── api.js           Frontend → Backend API calls
│   └── assets/
│       └── pulse-logo.png
│
├── data/
│   ├── flipkart_com-ecommerce_sample.csv   Raw dataset
│   └── flipkart_modified.csv              Cleaned dataset
│
└── train_model.py           Model training script
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router v7, Tailwind CSS, Recharts |
| Backend | Python, Flask, Flask-CORS |
| ML Model | scikit-learn (Random Forest Regressor) |
| Data Processing | pandas, NumPy |
| State / Storage | Browser localStorage (no database needed) |

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- Python 3.9+
- pip

---

### 1. Clone the repo

```bash
git clone https://github.com/your-username/price-pulse.git
cd price-pulse
```

---

### 2. Start the Flask backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Backend runs at → `http://localhost:5000`

> The trained model (`price_model.pkl`) is already included. Skip to step 3.

---

### 3. Start the React frontend

```bash
# From the price-pulse root directory
npm install
npm start
```

Frontend runs at → `http://localhost:3000`

---

### 4. (Optional) Retrain the model

If you want to retrain from scratch:

```bash
# From the price-pulse root directory
python train_model.py
```

This reads `data/flipkart_modified.csv`, trains the model, and saves it to `backend/price_model.pkl`.

---

## 🔌 API Reference

### `POST /predict`

Returns an AI-recommended price based on product parameters.

**Request body:**
```json
{
  "manufacturing_cost": 800,
  "stock": 50,
  "quantity": 30,
  "rarity": "medium",
  "demand": "high"
}
```

**Response:**
```json
{
  "recommended_price": 1124.50,
  "breakdown": {
    "manufacturing_cost": 800,
    "stock_norm": 25.0,
    "qty_norm": 15.0,
    "rarity_score": 50,
    "demand_score": 100
  }
}
```

**Rarity values:** `"low"` | `"medium"` | `"high"`
**Demand values:** `"low"` | `"medium"` | `"high"`

---

### `GET /health`

```json
{ "status": "ok" }
```

---

## 📱 Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Landing page with features, stats, and CTA |
| Login | `/login` | Demo authentication |
| Dashboard | `/dashboard` | Product catalog with AI prices and stats |
| Pricing | `/pricing` | Input parameters and get price recommendation |

---

## 📊 ML Model Details

```
Algorithm     : Random Forest Regressor
Trees         : 200
Dataset       : 918 Flipkart products
Train/Test    : 80% / 20% split
R² Accuracy   : 98.7%
Features      : manufacturing_cost, stock_norm, qty_norm, rarity_score, demand_score
Target        : Optimal selling price
```

**Feature engineering highlights:**
- `manufacturing_cost` — simulated as 55–75% of retail price
- `demand_score` — derived from product ratings (0–5 → 0/50/100)
- `rarity_score` — encoded from rarity category (0/50/100)
- `stock_norm` / `qty_norm` — normalised to 0–100 scale

---

## 📁 Dataset

The model was trained on a modified version of the [Flipkart E-Commerce Dataset](https://www.kaggle.com/datasets/PromptCloudHQ/flipkart-products) with additional engineered columns:

- `Stock_Level` — inventory quantity
- `Quantity` — units sold
- `Rarity_Encoded` — product rarity (0, 1, 2)

---

## 🗺️ Roadmap

- [ ] User authentication with JWT
- [ ] PostgreSQL database for persistent product storage
- [ ] Pricing history charts per product
- [ ] Bulk CSV product import
- [ ] Price sensitivity analysis view
- [ ] Deploy to cloud (Render / Vercel)

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

---

## 📄 License

[MIT](LICENSE)

---

> Built with React + Flask + Random Forest ML · © 2025 Price Pulse
