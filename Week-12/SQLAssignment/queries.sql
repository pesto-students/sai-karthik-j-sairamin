-- ○ Find the item that has minimum weight.
-- ○ Find the different warehouses in “Pune”.
-- ○ Find the details of items ordered by a customer “Mr. Patil”.
-- ○ Find a Warehouse which has maximum stores.
-- ○ Find an item which is ordered for a minimum number of times.
-- ○ Find the detailed orders given by each customer

-- *******************************************************
-- ○ Find the item that has minimum weight.

SELECT * FROM items ORDER BY item_weight ASC LIMIT 1;

-- *******************************************************

-- *******************************************************
-- ○ Find the different warehouses in “Pune”.

SELECT * FROM warehouses WHERE warehouse_location="Pune";
-- There is only one warehouse in Pune.

-- *******************************************************

-- *******************************************************
-- ○ Find the details of items ordered by a customer “Mr. Patil”.

SELECT * FROM customer WHERE cu_name="Mr. Patil"
SELECT o_no FROM orders WHERE cu_id = (SELECT cu_id FROM customer WHERE cu_name="Mr. Patil");

-- LONG PAINFUL WAY TO GET DATA -- NOT very descriptive
SELECT item_id, order_id, ordered_quantity FROM items_ordered 
	WHERE order_id IN (SELECT o_no FROM orders 
	WHERE cu_id = (SELECT cu_id FROM customer WHERE cu_name="Mr. Patil")) 
	ORDER BY item_id;

-- Highly descriptive. This is much better. 
-- Inner join works because there is always some common link between these
-- tables and I can use that link to get all information without dealing with NULLs
SELECT customer.cu_id, cu_name, o_date, o_no, item_id, item_description, ordered_quantity FROM customer
	INNER JOIN orders	
		ON customer.cu_id = orders.cu_id
	INNER JOIN items_ordered
		ON orders.o_no = items_ordered.order_id
	INNER JOIN items
		ON items_ordered.item_id = items.item_no
	WHERE cu_name="Mr. Patil"
	ORDER BY o_date, o_no;

-- *******************************************************

-- *******************************************************
-- ○ Find a Warehouse which has maximum stores.

-- This will only give id of warehouse that has max stores
SELECT warehouse_id, COUNT(*) AS stores_count FROM stores GROUP BY warehouse_id ORDER BY 2 DESC LIMIT 1;

-- This will give name of warehouse id and name too 
SELECT warehouses.warehouse_id, warehouse_name,  COUNT(*) AS stores_count FROM warehouses
	LEFT JOIN stores 
	ON warehouses.warehouse_id = stores.warehouse_id
	GROUP BY stores.warehouse_id
	ORDER BY stores_count DESC LIMIT 1;

-- INNER JOIN and LEFT JOIN will give same result in this situation.
SELECT warehouses.warehouse_id, warehouse_name,  COUNT(*) AS stores_count FROM warehouses
	INNER JOIN stores 
	ON warehouses.warehouse_id = stores.warehouse_id
	GROUP BY stores.warehouse_id
	ORDER BY stores_count DESC LIMIT 1;

--NOTE: Warehouse_h with id = 8 has max number of stores (6).
-- *******************************************************

-- *******************************************************
-- ○ Find an item which is ordered for a minimum number of times.

-- BELOW will only give item_id
SELECT item_id, SUM(ordered_quantity) FROM items_ordered GROUP BY item_id ORDER BY 2 LIMIT 1;

-- BELOW will give item_id and item_description

-- RIGHT JOIN will ensure the item is ordered atleast ONCE then.. IFNULL() is NOT needed.
-- LEFT JOIN will show items that were not ordered at all too... In that case IFNULL() is needed.
SELECT item_no, item_description, IFNULL(SUM(ordered_quantity),0) AS total FROM items 
	RIGHT JOIN items_ordered
	ON items.item_no = items_ordered.item_id
    GROUP BY items_ordered.item_id 
    ORDER BY 3 LIMIT 1;

-- *******************************************************

-- *******************************************************
-- ○ Find the detailed orders given by each customer

-- COMBINING MULTIPLE TABLES USING INNER JOINS WILL GET ALL REQUIRED INFORMATION ABOUT ORDERS
SELECT customer.cu_id, cu_name, o_date, o_no, item_id, item_description, ordered_quantity FROM customer
	INNER JOIN orders
		ON customer.cu_id = orders.cu_id
	INNER JOIN items_ordered
		ON orders.o_no = items_ordered.order_id
	INNER JOIN items
		ON items_ordered.item_id = items.item_no
	ORDER BY o_date, o_no;
-- *******************************************************