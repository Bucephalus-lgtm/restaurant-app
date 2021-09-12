const express = require('express');
const router = express.Router();

const RestaurantController = require('../controllers/restaurants');

router.get('/', RestaurantController.get_all_restaurants);
router.get('/:id', RestaurantController.get_restaurant_by_id);
router.post('/', RestaurantController.create_restaurant);
router.put('/:id', RestaurantController.update_restaurant);
router.delete('/:id', RestaurantController.delete_restaurant);
router.post('/:restaurant_id/addReview', RestaurantController.add_review);

module.exports = router;