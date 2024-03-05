import { useLocation } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

const Details = ( ) => {
    const { addFavorite, removeFavorite, isAdded } = useFavorites();
    const location = useLocation();
    const { movie } = location.state || {};


    const handleToggleFavorite = () => {
        if (isAdded) {
            removeFavorite(movie);
        } else {
            addFavorite(movie);
        }
    };

    if (!movie) {
        return <div>No movie details available.</div>;
    }

    return (
        <div className='details'>
            <div className="details-img">
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.original_title} />
            </div>
            <div className="details-info">
                <h2><span>{movie.original_title}</span></h2>
                <p>{movie.overview}</p>
                <p>Release date:<span> {movie.release_date}</span></p>
                <p>Review score:<span> <i className="bi bi-star-fill"></i> {movie.vote_average}</span> ({movie.vote_count})</p>
                <button onClick={handleToggleFavorite} className='details-btn-favorite'>
                    <p>{isAdded ? 'Remove from Favorites' : 'Add to Favorites'} <i className={!isAdded? "bi bi-heart-fill" : "bi bi-x-lg"} id="star"></i></p>
                </button>
            </div>
        </div>
    );
};

export default Details;
