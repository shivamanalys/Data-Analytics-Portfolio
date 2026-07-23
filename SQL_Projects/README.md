# 🛢️ Advanced SQL Analytics Series

Welcome to the SQL Data Analytics section of my portfolio! Here, I solve complex business problems using **SQL Queries**, focusing on Join Operations, Aggregations, Subqueries, Window Functions, and CTEs (Common Table Expressions).

---

## 🍕 1. Pizza Store Sales Analysis
> **Tools:** MySQL, CTEs, Window Functions, Multi-Table Joins

### 📌 Project Overview
Is project mein transactional pizza sales data analyze kiya gaya hai[cite: 7]. Main goal business revenue, hourly order distributions, best-selling pizzas, aur sales metrics track karna tha[cite: 7].

### 🛠️ Key Technical SQL Features:
* **Multi-Table Joins:** Joined `order_details`, `pizzas`, `pizza_types`, and `orders` to aggregate total revenue and quantities[cite: 7].
* **Window Functions & Ranking:** Used `RANK() OVER (PARTITION BY category ORDER BY revenue DESC)` to determine top revenue-generating pizzas in each category[cite: 7].
* **Time-Series Analysis:** Extracted order patterns by hour of the day (`HOUR(time)`) and day of the week (`DAYNAME(date)`) for staff optimization[cite: 7].

---

## 🏪 2. Global Superstore Sales Analysis
> **Tools:** MySQL, Aggregations, Group By, Subqueries

### 📌 Project Overview
Superstore sales dataset ko SQL through query karke overall revenue, profit margins, top-performing product categories, aur regional customer dynamics analyze kiye gaye hain[cite: 8].

### 🛠️ Key Technical SQL Features:
* **Profitability & Sales Aggregation:** Calculated total revenue, total profit, and average discounts per product category[cite: 8].
* **Customer & Regional Insights:** Grouped data by `Region`, `State`, and `Segment` to locate high-value customer bases[cite: 8].
* **Monthly Revenue Trends:** Formatted dates using `STR_TO_DATE()` and extracted month-on-month growth metrics[cite: 8].

---

## 🛠️ Technical SQL Skill Matrix
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Data Analysis](https://img.shields.io/badge/SQL_Queries-Advanced-red?style=for-the-badge)
