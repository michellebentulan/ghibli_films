import { useEffect, useState } from "react";
import { Film } from "./film.interface";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import './main-app.scss';


export function HomePage() {
  const [films, setFilms] = useState<Film[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://ghibliapi.vercel.app/films")
      .then((response) => setFilms(response.data));
  }, []);

  const handleNavigate = (filmId: string) => {
    navigate(filmId);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const addToWishlist = (filmId: string) => {
    if (!wishlist.includes(filmId)) {
      setWishlist([...wishlist, filmId]);
    } else {
      setWishlist(wishlist.filter(id => id !== filmId));
    }
  };

  const filteredFilms = films.filter(film =>
    film.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <div className="app-header">
        <div className="header-content">
          <img src="/ghibli-logo.png" alt="Studio Ghibli Logo" className="ghibli-logo" />
          <div>
            <h1>Studio Ghibli Films</h1>
            <small>Your favorite Ghibli movies all in one place</small>
          </div>
          <img src="/umb.png" alt="Studio Ghibli Logo" className="umbrella" />
        </div>
      </div>

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for a film..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>

      <div className="film-container">
        {filteredFilms.map((film) => (
          <div
            key={film.id}
            className="film-item"
            onClick={() => handleNavigate(film.id)}
          >
            <div className="wishlist-icon" onClick={(e) => { e.stopPropagation(); addToWishlist(film.id); }}>
              <FontAwesomeIcon
                icon={wishlist.includes(film.id) ? fasHeart : farHeart}
                style={{ color: wishlist.includes(film.id) ? 'red' : 'inherit' }}
              />
            </div>
            <img src={film.image} alt={film.title} />
            <p className="film-title">{film.title}</p>
            <div className="film-details">
              <p><i className="fas fa-clock"></i> {film.running_time} mins</p>
              <p><i className="fas fa-star"></i> {film.rt_score}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;

