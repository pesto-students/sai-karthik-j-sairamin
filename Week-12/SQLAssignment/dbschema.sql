DROP DATABASE warehousedb;
CREATE DATABASE warehousedb;
USE warehousedb;
CREATE TABLE cities (
    cityid INTEGER AUTO_INCREMENT PRIMARY KEY,
    city CHAR(20),
    state CHAR(20)
);

-- ONE CITY has many warehouses.
-- So, cities --> warehouses has 1-M relation
CREATE TABLE warehouses (
	w_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    w_name CHAR(30),
    w_location CHAR(20),
	`extra content` JSON, 
    cityid INTEGER,
    FOREIGN KEY(cityid) REFERENCES cities(cityid)
);

-- ONE WAREHOUSE supplies to many stores.
-- So warehouses --> stores has 1-M relation
CREATE TABLE stores(
	store_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    store_name CHAR(20),
    store_location_city CHAR(20),
    warehouse_id INTEGER,
    FOREIGN KEY(warehouse_id) REFERENCES warehouses(w_id)
);

CREATE TABLE customer(
	c_no INTEGER AUTO_INCREMENT PRIMARY KEY,
    c_name CHAR(20),
    c_addr VARCHAR(50),
    cu_city CHAR(20)
);

-- One Customer can have many orders.
-- So, customer --> orders has 1-M relation.
CREATE TABLE orders(
	o_no INTEGER AUTO_INCREMENT PRIMARY KEY,
    o_date DATE,
    cu_id INTEGER,
    item_no INTEGER,
    FOREIGN KEY(cu_id) REFERENCES customer(c_no),
    FOREIGN KEY(item_no) REFERENCES items(item_no)
);
-- Each order is related to an item.
-- So, there must be mention of item_no (unique to each item) for each order.
-- Thus with 2 foreign keys, this becomes M-M relationship between items --> orders

CREATE TABLE items(
	item_no INTEGER AUTO_INCREMENT PRIMARY KEY,
    item_description TEXT,
    item_weight DECIMAL(5,2),
    item_cost DECIMAL(5,2)
);

