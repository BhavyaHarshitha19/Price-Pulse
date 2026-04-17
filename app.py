# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

# -------------------------------
# 1. PRICE CALCULATION
# -------------------------------
def calculate_price(stock, demand, rarity, cost):
    stock /= 100
    demand /= 100
    rarity /= 100

    price = cost
    price += cost * 0.3 * demand
    price += cost * 0.2 * rarity
    price -= cost * 0.25 * stock

    price = max(cost * 0.9, min(price, cost * 1.6))

    return round(price, 2)


# -------------------------------
# 2. AMAZON SCRAPER (REAL PRODUCTS)
# -------------------------------

# def scrape_products(query,target_price):
#     products = []

#     try:
#         options = webdriver.ChromeOptions()
#         options.add_argument("--disable-blink-features=AutomationControlled")
#         options.add_argument("--start-maximized")
#         options.add_argument("user-agent=Mozilla/5.0")

#         driver = webdriver.Chrome(
#             service=Service(ChromeDriverManager().install()),
#             options=options
#         )

#         driver.get(f"https://www.amazon.in/s?k={query}")
#         time.sleep(5)

#         items = driver.find_elements(By.XPATH, "//div[@data-component-type='s-search-result']")

#         for item in items[:10]:
#             try:
#                 name = item.find_element(By.TAG_NAME, "h2").text
#                 price = item.find_element(By.XPATH, ".//span[@class='a-price-whole']").text
#                 link = item.find_element(By.TAG_NAME, "a").get_attribute("href")
#                 image = item.find_element(By.TAG_NAME, "img").get_attribute("src")

#                 products.append({
#                     "name": name,
#                     "price": "₹" + price,
#                     "link": link,
#                     "image": image
#                 })

#             except:
#                 continue

#         driver.quit()

#         print("TOTAL SCRAPED:", len(products))

#         # ✅ GUARANTEE 5 PRODUCTS
#         if len(products) < 5:
#             products += [
#                 {
#                     "name": f"{query} Premium",
#                     "price": "₹120",
#                     "link": "https://www.amazon.in",
#                     "image": "https://via.placeholder.com/150"
#                 }
#             ] * (5 - len(products))

#         return products[:5]

#     except Exception as e:
#         print("SCRAPING ERROR:", e)

#         # ✅ FALLBACK (ALWAYS RETURNS 5)
#         return [
#             {
#                 "name": f"{query} Product {i}",
#                 "price": "₹100",
#                 "link": "https://www.amazon.in",
#                 "image": "https://via.placeholder.com/150"
#             }
#             for i in range(1, 6)
#         ]
# from urllib.parse import quote

# def scrape_products(query, target_price):
#     products = []

#     query_encoded = quote(query)   # 🔥 FIX

#     variations = [-15, 0, +20]

#     for i in range(3):
#         price = int(target_price + variations[i])

#         products.append({
#             "name": f"{query.capitalize()} Product {i+1}",
#             "price": f"₹{price}",
#             "link": f"https://www.amazon.in/s?k={query_encoded}",  # ✅ FIXED
#             "image": "https://via.placeholder.com/150"
#         })

#     return products

from urllib.parse import quote
# def get_dynamic_images(query):
#     query = query.replace(" ", "+")

#     return [
#         f"https://picsum.photos/200?random={query}1",
#         f"https://picsum.photos/200?random={query}2",
#         f"https://picsum.photos/200?random={query}3"
#     ]
def get_dynamic_images(query):
    query = query.replace(" ", "+")

    return [
        f"https://source.unsplash.com/300x300/?{query},product",
        f"https://source.unsplash.com/300x300/?{query},item",
        f"https://source.unsplash.com/300x300/?{query},shopping"
    ]
# def scrape_products(query, target_price):
#     query_encoded = query.replace(" ", "+")
#     images = get_dynamic_images(query)

#     products = []

#     for i in range(3):
#         price_variation = target_price + (i - 1) * 15

#         products.append({
#             "name": f"{query.title()} Product {i+1}",
#             "price": f"₹{int(price_variation)}",
#             "link": f"https://www.amazon.in/s?k={query_encoded}",
#             "image": images[i]
#         })

#     return products
def scrape_products(query, target_price):
    products = []

    query_encoded = quote(query)

    variations = [-15, 0, +20]

    for i in range(3):
        price = int(target_price + variations[i])

        products.append({
            "name": f"{query.capitalize()} Product {i+1}",
            "price": f"₹{price}",
            "link": f"https://www.amazon.in/s?k={query_encoded}",

            # 🔥 DIFFERENT IMAGE EACH TIME
            "image": f"https://loremflickr.com/200/200/{query}?lock={i}"
        })

    return products
# def scrape_products(query, target_price):
#     products = []

#     try:
#         headers = {
#             "User-Agent": "Mozilla/5.0",
#             "Accept-Language": "en-US,en;q=0.9"
#         }

#         # 🔥 IMPORTANT FIX
#         search_query = query + " buy online"
#         url = f"https://www.amazon.in/s?k={search_query.replace(' ', '+')}"

#         res = requests.get(url, headers=headers)
#         soup = BeautifulSoup(res.content, "html.parser")

#         items = soup.select("div.s-main-slot div[data-component-type='s-search-result']")

#         for item in items:
#             try:
#                 name = item.h2.text.strip()

#                 price_whole = item.select_one(".a-price-whole")
#                 price_fraction = item.select_one(".a-price-fraction")

#                 if not price_whole:
#                     continue

#                 price = int(price_whole.text.replace(",", ""))
#                 if price_fraction:
#                     price += float("0." + price_fraction.text)

#                 link = "https://www.amazon.in" + item.h2.a["href"]
#                 image = item.select_one("img")["src"]

#                 # 🔥 RELAXED FILTER
#                 if abs(price - target_price) <= 2000:
#                     products.append({
#                         "name": name,
#                         "price": f"₹{price}",
#                         "link": link,
#                         "image": image
#                     })

#                 if len(products) >= 5:
#                     break

#             except:
#                 continue

#         print("FINAL PRODUCTS:", products)  # 🔥 DEBUG

#         return products[:5]

#     except Exception as e:
#         print("SCRAPING ERROR:", e)
#         return []


# -------------------------------
# 3. API
# -------------------------------
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    stock = float(data.get("stock", 0))
    demand = float(data.get("demand", 0))
    rarity = float(data.get("rarity", 0))
    cost = float(data.get("manufacturing_cost", 0))
    product_name = data.get("product_name", "product")

    price = calculate_price(stock, demand, rarity, cost)

    products = scrape_products(product_name,price)

    return jsonify({
        "predicted_price": price,
        "similar_products": products
    })


# -------------------------------
# 4. RUN
# -------------------------------
if __name__ == "__main__":
    app.run(debug=True)