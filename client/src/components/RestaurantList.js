import React, { useEffect, useContext, Fragment } from 'react';
import { RestaurantContext } from '../context/RestaurantContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import { useHistory } from 'react-router-dom';
import StarRating from './StarRating';

const RestaurantList = () => {
    const history = useHistory();

    const { restaurants, setRestaurants } = useContext(RestaurantContext);

    useEffect(() => {
        const fetchData = async () => {
            const response = await RestaurantFinder.get('/');
            setRestaurants(response.data.data.restaurants);
            console.log(response);
        }
        fetchData();
    }, []);

    const deleteRestaurant = async (e, id) => {
        e.stopPropagation();
        try {
            await RestaurantFinder.delete(`/${id}`);
            setRestaurants(
                restaurants.filter(restaurant => restaurant.id != id)
            )
        } catch (err) {
            console.error(err);
        }
    }

    const updateRestaurant = async (e, id) => {
        e.stopPropagation();
        history.push(`/restaurants/${id}/update`);
    }

    const handleRestaurantSelect = (e, id) => {
        history.push(`/restaurants/${id}`);
    }

    const renderRating = (restaurant) => {
        if(!restaurant.count){
            return <span className='text-warning'>0 reviews</span>
        }

        return (
            <Fragment>
                <StarRating rating={restaurant.id} />
                <span className="text-warning ml-1">({restaurant.count})</span>
            </Fragment>
        )
    }

    return (
        <div className='list-group'>
            <table className="table table-hover table-dark table-striped">
                <thead>
                    <tr className='bg-primary'>
                        <th scope='col'>Restaurant</th>
                        <th scope='col'>Location</th>
                        <th scope='col'>Price Range</th>
                        <th scope='col'>Ratings</th>
                        <th scope='col'>Edit</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants.length > 0 && restaurants.map(restaurant => (
                        <tr onClick={e => handleRestaurantSelect(e, restaurant.id)}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.location}</td>
                            <td>{'$'.repeat(2)}</td>
                            <td>{renderRating(restaurant)}</td>
                            <td>
                                <button className="btn btn-sm btn-warning" onClick={e => updateRestaurant(e, restaurant.id)}>Update</button>
                            </td>
                            <td>
                                <button className="btn btn-sm btn-danger" onClick={e => deleteRestaurant(e, restaurant.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList;