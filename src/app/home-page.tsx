import { useEffect, useState } from "react";
import { Film } from "./film.interface";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './main-app.scss';

export function HomePage() {
  const [films, setFilms] = useState<Film[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://ghibliapi.vercel.app/films")
      .then((response) => setFilms(response.data));
  }, []);

  const handleNavigate = (filmId: string) => {
    navigate(filmId);
  };

  return (
    <div className="App">
      <div className="app-header">
        <h1>Studio Ghibli Films</h1>
        <small>Your favorite Ghibli movies all in one place</small>
      </div>
      <div className="film-container">
        {films.map((film) => (
          <div
            key={film.id}
            className="film-item"
            onClick={() => handleNavigate(film.id)}
          >
            <img src={film.image} alt={film.title} />
            <p className="film-title">{film.title}</p>
            <div className="film-details">
              <p><i className="fas fa-clock"></i> {film.running_time} mins</p>
              <p><i className="fas fa-star"></i> R: {film.rt_score}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
