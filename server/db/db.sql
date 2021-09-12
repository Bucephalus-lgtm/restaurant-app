-- for any help \?
-- for all databases \l
-- for connecting to one database \c <__DB_NAME__>
-- for TABLE of a database \d <__TABLE_NAME__>
--

-- CREATE DATABASE __your_db_name__

CREATE DATABASE yelp;

CREATE TABLE restaurants( id BIGSERIAL NOT NULL PRIMARY KEY, name VARCHAR(255) NOT NULL, location VARCHAR(255) NOT NULL, price_range INT NOT NULL );

INSERT INTO restaurants(name, location, price_range) VALUES ('Bhargab Hotel', 'Mumbai', 3000);

SELECT  *
FROM restaurants;

CREATE TABLE reviews( 
    id BIGSERIAL NOT NULL PRIMARY KEY, 
    restaurant_id BIGINT NOT NULL REFERENCES restaurants(id), 
    name VARCHAR(50) NOT NULL, 
    review TEXT NOT NULL, 
    rating INT CHECK(rating >= 1 AND rating <= 5) 
);

INSERT INTO reviews(restaurant_id, name, review, rating) VALUES (2, 'bhargab', 'good', 2);

SELECT * FROM reviews;
SELECT * FROM reviews WHERE restaurant_id = 2;