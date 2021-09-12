import React, { useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';

const AddReview = () => {
    const [name, setName] = useState('');
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');

    const { id } = useParams();
    const history = useHistory();
    const location = useLocation();
    const pathname = location.pathname;

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await RestaurantFinder.post(`/${id}/addReview`, {
                name,
                rating,
                review
            });

            console.log(response);

            history.push('/');
            history.push(pathname);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="mb-2">
            <form>
                <div className="form row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Name</label>
                        <input
                            name={name}
                            onChange={e => setName(e.target.value)}
                            id='name' type="text" className='form-control' />
                    </div>
                    <div className="form-group col-4">
                        <label id='rating' htmlFor="rating">Rating</label>
                        <select
                            value={rating}
                            onChange={e => setRating(e.target.value)}
                            name="rating" id="rating" className='form-select'>
                            <option selected>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="review">Review</label>
                    <textarea
                        value={review}
                        onChange={e => setReview(e.target.value)}
                        name="review" id="review" className='form-control'></textarea>
                </div>
                <button onClick={handleSubmit} className="btn btn-primary mt-2">Add</button>
            </form>
        </div>
    )
}

export default AddReview;