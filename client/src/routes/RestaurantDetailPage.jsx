import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RestaurantContext } from '../context/RestaurantContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`);
      console.log(response.data.data);
      setSelectedRestaurant(response.data.data);
    }
    fetchData();
  }, []);

  return (
    <div className='container'>
      <h1 className="text-center">{selectedRestaurant && selectedRestaurant.restaurant[0].name} Details</h1>
      <figure class="text-center">
        <blockquote class="blockquote">
          <p>“Get busy living or get busy dying.”</p>
        </blockquote>
        <figcaption class="blockquote-footer">
          <cite title="Source Title">Stephen King</cite>
        </figcaption>
      </figure>

      <div className="text-center">
        <StarRating rating={selectedRestaurant?.restaurant[0].average_rating} />
        <span className='text-warning'>{selectedRestaurant?.restaurant[0].count ? `(${selectedRestaurant.restaurant[0].count})` : '(0)'}</span>
      </div>

      <div className="mt-3">
        <Reviews selectedRestaurant={selectedRestaurant} />
      </div>
      <AddReview />
    </div>
  );
};

export default RestaurantDetailPage;