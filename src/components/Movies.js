
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import ReactPaginate from 'react-paginate';

const Movies = (props) => {
  const { addFavorite, removeFavorite, favorites } = useFavorites();
  const [currentPage, setCurrentPage] = useState(0);
  const moviesPerPage = 8;

  const indexOfLastMovie = (currentPage + 1) * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = props.movieList.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const isMovieInFavorites = (movie) => {
    return favorites.some((fav) => fav.id === movie.id);
  };

  const handleToggleFavorite = (movie) => {
    if (isMovieInFavorites(movie)) {
      removeFavorite(movie);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <>
      <div className='movies-wrapper'>
        {currentMovies.map((movie) => (
          <div key={movie.id} className='movie-info'>
            <Link to={`/movie/${movie.id}`} state={{ movie }}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.original_title} />
            </Link>
            <div className='add-favorite' onClick={() => handleToggleFavorite(movie)}>
              <p>{isMovieInFavorites(movie) ? 'Remove from Favorites' : 'Add to Favorites'} <i className={isMovieInFavorites(movie) ? "bi bi-x-lg" : "bi bi-heart-fill"} id="star"></i></p>
            </div>
            <p>
              <i className="bi bi-star-fill"></i> {movie.vote_average}
            </p>
            <p className='title'>{movie.original_title}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <ReactPaginate
          previousLabel={'Previous'}
          previousLinkClassName={'previous'}
          nextLabel={'Next'}
          nextLinkClassName={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(props.movieList.length / moviesPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    </>
  );
};

export default Movies;
