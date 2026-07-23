#1 Calculate the Total Revenue generated from all pizza sales.
		select sum(order_details.quantity * pizzas.price) AS total_revenue
			from order_details inner join pizzas 
			on order_details.pizza_id = pizzas.pizza_id;


#2 How many total orders were placed?
		select count(order_id) as total_orders from orders;


#3 How many pizzas were sold in total?
		select count( distinct order_id)as Total_Orders from order_details;
		select SUM(quantity) as Total_Pizzas_Sold from order_details;


#4 Find the Top 5 Best-Selling Pizzas based on total quantity sold.
							SELECT
							pizza_types.name,
							SUM(order_details.quantity) AS total_quantity
							FROM order_details
							INNER JOIN pizzas
							ON order_details.pizza_id = pizzas.pizza_id
							INNER JOIN pizza_types
							ON pizzas.pizza_type_id = pizza_types.pizza_type_id
							GROUP BY pizza_types.name
							ORDER BY total_quantity DESC
							LIMIT 5;


#5 Find the Top 5 Highest Revenue Generating Pizzas.
					SELECT
					pizza_types.name,
					SUM(order_details.quantity * pizzas.price) AS total_revenue
					FROM order_details
					INNER JOIN pizzas
					ON order_details.pizza_id = pizzas.pizza_id
					INNER JOIN pizza_types
					ON pizzas.pizza_type_id = pizza_types.pizza_type_id
					GROUP BY pizza_types.name
					ORDER BY total_revenue DESC
					LIMIT 5;
                    
#6 Find the total quantity of pizzas sold for each pizza category. 
					SELECT
					pizza_types.category,
					SUM(order_details.quantity) AS total_quantity
					FROM order_details
					INNER JOIN pizzas
					ON order_details.pizza_id = pizzas.pizza_id
					INNER JOIN pizza_types
					ON pizzas.pizza_type_id = pizza_types.pizza_type_id
					GROUP BY pizza_types.category
					ORDER BY total_quantity DESC;


#7 Find the distribution of orders by hour of the day.       

					SELECT
					HOUR(`time`) AS order_hour,
					COUNT(order_id) AS total_orders
					FROM orders
					GROUP BY HOUR(`time`)
					ORDER BY order_hour;
                    
#8 Find the distribution of orders by day of the week
					select 
					dayname(`date`) as order_week,
					count(order_id) as total_orders
					from orders
					group by dayname(date) 
					order by order_week;
                    
#9 Find the average number of pizzas ordered per day. 
SELECT AVG(total_pizzas) AS avg_pizzas_per_day
FROM (
    SELECT
        orders.`date`,
        SUM(order_details.quantity) AS total_pizzas
    FROM orders
    INNER JOIN order_details
        ON orders.order_id = order_details.order_id
    GROUP BY orders.`date`
) AS daily_sales;


#10 Display the Order ID, Pizza Name, Quantity, and Price for each order.

					select order_details.order_id,
					pizza_types.name,
					order_details.quantity,
					pizzas.price
					from order_details 
					inner join pizzas on order_details.pizza_id=pizzas.pizza_id
					inner join pizza_types on pizzas.pizza_type_id=pizza_types.pizza_type_id;

#11 Display the Pizza Name, Category, and Price of all pizzas.

					select pizza_types.name as pizza_name,
					pizza_types.category,
					pizzas.price
					from pizza_types
					inner join pizzas on pizza_types.pizza_type_id=pizzas.pizza_type_id;


#12 Find the number of pizzas available in each category.

					select category,count(category) as 
					total_pizzas from pizza_types
					group by category order by category;

#13 Find the average price of pizzas for each category.

					select pizza_types.category,
					avg(pizzas.price) as avg_price
                    
					from pizza_types
					inner join pizzas on pizza_types.pizza_type_id=pizzas.pizza_type_id
					group by pizza_types.category
					order by pizza_types.category;

#14 Find the highest priced pizza.

					select pizza_types.name as pizza_name,
					pizzas.price as highest_price
					from pizza_types 
					inner join pizzas on pizza_types.pizza_type_id=pizzas.pizza_type_id
					where pizzas.price=(select max(price) from pizzas);

#15 Find the top 3 pizza categories based on total revenue.

					select pizza_types.category,
					sum(order_details.quantity * pizzas.price) as total_revenue
					from order_details
					inner join pizzas on order_details.pizza_id = pizzas.pizza_id
					inner join pizza_types on pizzas.pizza_type_id = pizza_types.pizza_type_id
					group by  pizza_types.category
					ORDER BY total_revenue DESC
					limit 3;

#16 Find the Top 5 Highest Revenue Generating Pizza Sizes.

					select pizzas.size,
					sum(order_details.quantity * pizzas.price) as total_revenue
					from order_details
					inner join pizzas on order_details.pizza_id = pizzas.pizza_id
					inner join pizza_types on pizzas.pizza_type_id = pizza_types.pizza_type_id
					group by pizzas.size
					order by total_revenue DESC
					limit 5; 

#17 Find the number of pizzas sold for each pizza size.

					select pizzas.size,
					sum(order_details.quantity) as total_quantity
					from order_details
					inner join pizzas on order_details.pizza_id = pizzas.pizza_id
					group by pizzas.size
					order by total_quantity desc;
                    
 #18 Find the Top 5 Most Ordered Pizza Names (based on total quantity sold).      
 
					 select pizza_types.name as pizza_name,
					 sum(order_details.quantity) as total_quantity
					from order_details
					inner join pizzas on order_details.pizza_id = pizzas.pizza_id
                    inner join pizza_types on pizzas.pizza_type_id = pizza_types.pizza_type_id
					group by pizza_types.name
					order by total_quantity desc
                     LIMIT 5;
                     
#19 Find the Top 3 Highest Revenue Generating Pizza Names in each Category.  
					WITH ranked_pizzas AS (
					SELECT
					pizza_types.category,
					pizza_types.name AS pizza_name,
					SUM(order_details.quantity * pizzas.price) AS total_revenue,
					RANK() OVER (
					PARTITION BY pizza_types.category
					ORDER BY SUM(order_details.quantity * pizzas.price) DESC
					) AS revenue_rank
					FROM order_details
					INNER JOIN pizzas
					ON order_details.pizza_id = pizzas.pizza_id
					INNER JOIN pizza_types
					ON pizzas.pizza_type_id = pizza_types.pizza_type_id
					GROUP BY
					pizza_types.category,
					pizza_types.name
					)

					SELECT
						category,
						pizza_name,
						total_revenue
					FROM ranked_pizzas
					WHERE revenue_rank <= 3
					ORDER BY category, revenue_rank;

#20 Find the Monthly Revenue Trend.

					select monthname(orders.date) as month ,
					sum(order_details.quantity * pizzas.price) as total_revenue
					from order_details
					inner join orders on order_details.order_id = orders.order_id
					inner join pizzas on order_details.pizza_id = pizzas.pizza_id
					group by  month(orders.date), MONTHNAME(orders.date)     
					order by month(orders.date); 

                   