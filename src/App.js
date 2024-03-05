import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Favorites from "./pages/Favorites";
import Details from "./pages/Details";
import HandleFavorites from "./components/HandleFavorites";
import SearchByTitle from "./components/SearchByTitle";
import SearchByGenre from "./components/SearchByGenre";
import Movies from "./components/Movies";
import NotFound from "./pages/NotFound";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [optionValue, setOptionValue] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const getAllMovies = () => {
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=9f99830e33c457dcbbec13d518480a78")
      .then((res) => res.json())
      .then((data) => {
        setMovieList(data.results);
      })
      .catch((error) => {
        console.error("Fail to fetch movies", error);
      });
  };

  const getMoviesBySearch = (input) => {
    let url = "";

    if (input === searchValue) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=9f99830e33c457dcbbec13d518480a78&query=${searchValue}`;
    } else if (input === optionValue) {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=9f99830e33c457dcbbec13d518480a78&with_genres=${optionValue}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setMovieList(data.results);
        } else {
          getAllMovies();
        }
      })
      .catch((error) => {
        console.error("fail to fetch", error);
      });
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  useEffect(() => {
    if (searchValue.length > 2) {
      getMoviesBySearch(searchValue);
    }
  }, [searchValue]);

  useEffect(() => {
    getMoviesBySearch(optionValue);
  }, [optionValue]);

  const isFavoritesPage = location.pathname === "/favorites";
  const isDetailsPage = location.pathname.startsWith("/movie/");
  const isNotFound = location.pathname === "/not-found"

  return (
    <div className="App">
      <Navbar />
      <div className="search">
      {!isFavoritesPage && !isDetailsPage && !isNotFound &&  (
          <>
            <SearchByTitle searchValue={searchValue} setSearchValue={setSearchValue} />
            <SearchByGenre optionValue={optionValue} setOptionValue={setOptionValue} />
          </>
        )}
      </div>
      <Routes>
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/" element={<Movies movieList={movieList} favoriteComp={HandleFavorites}  />} />
        <Route path="/movie/:id" element={<Details favoriteComp={HandleFavorites}  />} />
        <Route path="/movie/:id" element={<Details favoriteComp={HandleFavorites}  />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
