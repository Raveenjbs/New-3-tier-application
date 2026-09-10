CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, description, price) VALUES
('Laptop', 'Powerful laptop for DevOps engineers', 55000.00),
('Keyboard', 'Mechanical keyboard', 2500.00),
('Mouse', 'Wireless mouse', 1200.00);
