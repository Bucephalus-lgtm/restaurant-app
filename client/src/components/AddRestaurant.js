import React, { useState, useContext } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantContext } from '../context/RestaurantContext';

const AddRestaurant = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('');

    const { addRestaurant } = useContext(RestaurantContext);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await RestaurantFinder.post('/', {
                name,
                location,
                price_range: priceRange
            });
            console.log(response.data.data.restaurant[0]);
            addRestaurant(response.data.data.restaurant[0]);
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div>
            <div className="mb-4">
                <form action="">
                    <div className="form row">
                        <div className="col">
                            <input type="text" placeholder='name' className="form-control" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="col">
                            <input type="text" placeholder='location' className="form-control" value={location} onChange={e => setLocation(e.target.value)} />
                        </div>
                        <div className="col">
                            <select
                                value={priceRange}
                                onChange={e => setPriceRange(e.target.value)}
                                className="form-select"
                            >
                                <option selected>Price Range</option>
                                <option value="1">$</option>
                                <option value="2">$$</option>
                                <option value="3">$$$</option>
                                <option value="4">$$$$</option>
                                <option value="5">$$$$$</option>
                            </select>
                        </div>
                        <div className="col">
                            <button className="btn btn-primary" onClick={handleSubmit}>Add</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddRestaurant;