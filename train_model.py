import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score

# Load dataset
df = pd.read_csv(r"C:\Users\snehi\Downloads\price pulse (2)\price pulse\data\flipkart_modified.csv")

df.columns = df.columns.str.strip()

# -----------------------------
# Feature Engineering
# -----------------------------

# Simulated cost (lower than retail price)
df["cost"] = df["retail_price"] * np.random.uniform(0.5, 0.8, len(df))

# Competitor price
df["competitor_price"] = df["discounted_price"]

# Simulated stock
df["stock"] = np.random.randint(10, 200, len(df))

# Rarity from category frequency
df["rarity"] = df.groupby("product_category_tree")["product_category_tree"].transform("count")
df["rarity"] = pd.qcut(df["rarity"], 3, labels=[0,1,2]).astype(int)

# Demand from ratings
df["demand"] = pd.cut(
    df["overall_rating"],
    bins=[0,2.5,4,5],
    labels=[0,1,2]
).astype(int)

# -----------------------------
# Target variable
# -----------------------------

y = (
    df["cost"] * 1.1 +
    df["competitor_price"] * 0.4 +
    df["demand"] * 300 +
    df["rarity"] * 400 -
    df["stock"] * 1.2
)

# Add small noise
y = y + np.random.normal(0, 50, len(y))

# Features
X = df[[
    "cost",
    "stock",
    "competitor_price",
    "rarity",
    "demand"
]]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestRegressor(n_estimators=300, random_state=42)
model.fit(X_train, y_train)

# Evaluation
preds = model.predict(X_test)
print("MAE:", mean_absolute_error(y_test, preds))
print("R2 Score:", r2_score(y_test, preds))

# Save model
with open("price_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("Model trained and saved successfully!")