const db = require('../db');

exports.get_all_restaurants = async (req, res) => {
    try {
        const sql = 'select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id';
        const restaurants = await db.query(sql);
        console.log({ res: restaurants.rows });
        return res.json({
            results: restaurants.rows.length,
            status: 'success',
            data: {
                restaurants: restaurants.rows
            }
        });
    } catch (err) {
        console.log(err.message);
        return res.json({ message: err.message });
    }
}

exports.get_restaurant_by_id = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = 'select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id WHERE id = $1';
        const sqlForReview = 'SELECT * FROM reviews WHERE restaurant_id = $1';
        const restaurant = await db.query(sql, [id]);
        const reviews = await db.query(sqlForReview, [id]);
        return res.json({
            data: {
                status: 'success',
                restaurant: restaurant.rows,
                reviews: reviews.rows
            }
        });
    } catch (err) {
        console.log(err.message);
        return res.json({ message: err.message });
    }
}

exports.create_restaurant = async (req, res) => {
    try {
        const { name, location, price_range } = req.body;
        const sql = 'INSERT INTO restaurants(name, location, price_range) VALUES ($1, $2, $3) RETURNING *';
        const restaurant = await db.query(sql, [name, location, price_range]);
        return res.json({
            data: {
                status: 'success',
                restaurant: restaurant.rows
            }
        });
    } catch (err) {
        console.log(err.message);
        return res.json({ message: err.message });
    }
}

exports.update_restaurant = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, location, price_range } = req.body;
        const sql = 'UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *';
        const restaurant = await db.query(sql, [name, location, price_range, id]);
        return res.json({
            data: {
                status: 'success',
                restaurant: restaurant.rows
            }
        });
    } catch (err) {
        console.log(err.message);
        return res.json({ message: err.message });
    }
}

exports.delete_restaurant = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = 'DELETE FROM restaurants WHERE id = $1';
        await db.query(sql, [id]);
        return res.json({
            data: {
                status: 'success'
            }
        });
    } catch (err) {
        console.log(err.message);
        return res.json({ message: err.message });
    }
}

exports.add_review = async (req, res) => {
    try {
        const restaurantId = req.params.restaurant_id;
        const { name, rating, review } = req.body;
        const sql = 'INSERT INTO reviews(restaurant_id, name, rating, review) VALUES ($1, $2, $3, $4) RETURNING *';
        const result = await db.query(sql, [restaurantId, name, rating, review]);
        return res.json({
            data: {
                status: 'success',
                review: result.rows
            }
        });
    } catch (err) {
        console.log(err.message);
        return res.json({ message: err.message });
    }
}