import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';

const UpdateRestaurant = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async e => {
            const response = await RestaurantFinder.get(`/${id}`);
            setName(response.data.data.restaurant[0].name);
            setLocation(response.data.data.restaurant[0].location);
            setPriceRange(response.data.data.restaurant[0].price_range);
            console.log(response.data.data.restaurant[0].name);
        }
        fetchData();
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
            name,
            location, 
            price_range: priceRange
        });
        console.log(updatedRestaurant);
        history.push('/');
    }

    console.log(id);
    return (
        <div>
            <form action="">
                <div className="form-group mb-2">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="form-control" />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="location">Location</label>
                    <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} className="form-control" />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="price_range">Price Range</label>
                    <input type="number" id="price_range" value={priceRange} onChange={e => setPriceRange(e.target.value)} className="form-control" />
                </div>
                <button type='submit' onClick={handleSubmit} className="btn btn-primary mt-2">Save</button>
            </form>
        </div>
    )
}

export default UpdateRestaurant;