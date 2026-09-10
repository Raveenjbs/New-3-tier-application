# 3-Tier Application Deployment Using Docker Compose

## Overview

This project demonstrates a working 3-tier application deployed using Docker Compose on an AWS EC2 Ubuntu server.

Application Flow:

User → Frontend → Backend API → PostgreSQL Database

## Technologies Used

- AWS EC2
- Ubuntu
- Docker
- Docker Compose
- Nginx
- Python Flask
- PostgreSQL

## Application Services

### Frontend
The frontend is a customer-facing ShopEase web application served using Nginx.

### Backend
The backend is developed using Python Flask and provides REST APIs for retrieving and adding products.

### Database
PostgreSQL is used to store product information.

## Project Structure

```text
three-tier-app/
├── frontend/
│   ├── Dockerfile
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── nginx.conf
├── backend/
│   ├── Dockerfile
│   ├── app.py
│   └── requirements.txt
├── database/
│   └── init.sql
├── docker-compose.yaml
├── .env
└── README.md
