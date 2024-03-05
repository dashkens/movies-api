import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { useFavorites } from '../context/FavoritesContext';

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();
  const [currentPage, setCurrentPage] = useState(0);
  const moviesPerPage = 8;

  const handleRemove = (favorite) => {
    removeFavorite(favorite);
  };

  const indexOfLastMovie = (currentPage + 1) * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentFavorites = favorites.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <div className='favorites-wrapper'>
      <h1 className='favorites-h1'>My Favorites</h1>

      {currentFavorites.length > 0 ? (
        <>
          <div className='movies-wrapper'>
            {currentFavorites.map((favorite) => (
              <div key={favorite.id} className='movie-info'>
                <Link to={`/movie/${favorite.id}`} state={{ movie: favorite }}>
                  <img src={`https://image.tmdb.org/t/p/w500/${favorite.poster_path}`} alt={favorite.original_title} />
                </Link>
                <div onClick={() => handleRemove(favorite)} className='add-favorite'>
                  <p>Remove from Favorites <i className='bi bi-x-lg' id='delete'></i></p>
                </div>
                <p><i className="bi bi-star-fill"></i> {favorite.vote_average}</p>
                <p className='title'>{favorite.original_title}</p>
              </div>
            ))}
          </div>

          <ReactPaginate
            previousLinkClassName={'previous'}
            nextLabel={'Next'}
            nextLinkClassName={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={Math.ceil(favorites.length / moviesPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </>
      ) : (
        <p className='no-favorites'>No movies were added yet. Go to the <Link to='/' id="go-back">main page</Link> to add some movies.</p>

      )}
    </div>
  );
};

export default Favorites;
