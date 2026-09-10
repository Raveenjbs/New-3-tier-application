import os
import time
import psycopg2

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def get_db_connection():
    return psycopg2.connect(
        host=os.getenv("DB_HOST", "database"),
        database=os.getenv("DB_NAME", "threetierdb"),
        user=os.getenv("DB_USER", "appuser"),
        password=os.getenv("DB_PASSWORD")
    )


@app.route("/api/health", methods=["GET"])
def health():
    try:
        conn = get_db_connection()
        conn.close()

        return jsonify({
            "status": "healthy",
            "database": "connected"
        }), 200

    except Exception as error:
        return jsonify({
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(error)
        }), 500


@app.route("/api/products", methods=["GET"])
def get_products():
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute(
            "SELECT id, name, description, price FROM products ORDER BY id"
        )

        rows = cur.fetchall()

        products = []

        for row in rows:
            products.append({
                "id": row[0],
                "name": row[1],
                "description": row[2],
                "price": float(row[3])
            })

        cur.close()
        conn.close()

        return jsonify(products)

    except Exception as error:
        return jsonify({"error": str(error)}), 500


@app.route("/api/products", methods=["POST"])
def add_product():
    data = request.get_json()

    name = data.get("name")
    description = data.get("description", "")
    price = data.get("price")

    if not name or price is None:
        return jsonify({
            "error": "Name and price are required"
        }), 400

    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute(
            """
            INSERT INTO products (name, description, price)
            VALUES (%s, %s, %s)
            RETURNING id
            """,
            (name, description, price)
        )

        product_id = cur.fetchone()[0]

        conn.commit()
        cur.close()
        conn.close()

        return jsonify({
            "message": "Product added successfully",
            "id": product_id
        }), 201

    except Exception as error:
        return jsonify({"error": str(error)}), 500


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000
    )
