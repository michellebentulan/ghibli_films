import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Film } from "./film.interface";
import './about-page.scss';


const trailerUrls: { [key: string]: string } = {
  '2baf70d1-42bb-4437-b551-e5fed5a87abe': 'https://www.youtube.com/embed/8ykEy-yPBFc',
  '12cfb892-aac0-4c5b-94af-521852e46d6a': 'https://www.youtube.com/embed/4vPeTSRd580?si=WCPZhYOVjIfVmoWl',
  '58611129-2dbc-4a81-a72f-77ddfc1b1b49': 'https://www.youtube.com/embed/92a7Hj0ijLs?si=wRBGMx1CzBpRx47n',
  'ea660b10-85c4-4ae3-8a5f-41cea3648e3e': 'https://www.youtube.com/embed/4bG17OYs-GA?si=1eT9cvrf1Z2TXH_I',
  '4e236f34-b981-41c3-8c65-f8c9000b94e7': 'https://www.youtube.com/embed/5gSKk-wwLsY?si=yMPFirC0Q_cmGWOh',
  'ebbb6b7c-945c-41ee-a792-de0e43191bd8': 'https://www.youtube.com/embed/awEC-aLDzjs?si=w178Rcwo3A5KGMCH',
  '1b67aa9a-2e4a-45af-ac98-64d6ad15b16c': 'https://www.youtube.com/embed/_7cowIHjCD4?si=zjEpKestU4SmrhCO',
  'ff24da26-a969-4f0e-ba1e-a122ead6c6e3': 'https://www.youtube.com/embed/0pVkiod6V0U?si=w81oFnWD9NdUPAtp',
  '0440483e-ca0e-4120-8c50-4c8cd9b965d6': 'https://www.youtube.com/embed/4OiMOHRDs14?si=8ndLqxCQzR-F0G0_',
  '45204234-adfd-45cb-a505-a8e7a676b114': 'https://www.youtube.com/embed/1C9ujuCPlnY?si=3CO34rsbhBHxM0J2',
  'dc2e6bd1-8156-4886-adff-b39e6043af0c': 'https://www.youtube.com/embed/ByXuk9QqQkk?si=NrCtfwg_IzlacqyP',
  '90b72513-afd4-4570-84de-a56c312fdf81': 'https://www.youtube.com/embed/Gp-H_YOcYTM?si=_UGjMr4tQ0FMbH_a',
  'cd3d059c-09f4-4ff3-8d63-bc765a5184fa': 'https://www.youtube.com/embed/iwROgK94zcM?si=46hoC8Rl5wryzMXu',
  '112c1e67-726f-40b1-ac17-6974127bb9b9': 'https://www.youtube.com/embed/8hxYx3Jq3kI?si=_h49amqbnt_JOUI6',
  '758bf02e-3122-46e0-884e-67cf83df1786': 'https://www.youtube.com/embed/CsR3KVgBzSM?si=DzxEkF7y5KYNkexD',
  '2de9426b-914a-4a06-a3a0-5e6d9d3886f6': 'https://www.youtube.com/embed/9CtIXPhPo0g?si=c9E9FRghjKq0ozi3',
  '45db04e4-304a-4933-9823-33f389e8d74d': 'https://www.youtube.com/embed/9nzpk_Br6yo?si=IVzgIn1v3A7q3LY6',
  '67405111-37a5-438f-81cc-4666af60c800': 'https://www.youtube.com/embed/RzSpDgiF5y8?si=H0A7_4YktwHvhSPB',
  '578ae244-7750-4d9f-867b-f3cd3d6fecf4': 'https://www.youtube.com/embed/W71mtorCZDw?si=pEy5SHUrt2Rbm46z',
  '5fdfb320-2a02-49a7-94ff-5ca418cae602': 'https://www.youtube.com/embed/jjmrxqcQdYg?si=ZA0DdvlUbAPys1SW',
  'd868e6ec-c44a-405b-8fa6-f7f0f8cfb500': 'https://www.youtube.com/embed/Sw7BggqBpTk?si=EPqgHxOgl9sdwyak',
  '790e0028-a31c-4626-a694-86b7a8cada40': 'https://www.youtube.com/embed/_PfhotgXEeQ?si=OVVYOfvAEQJXMjRX',

};


export function AboutPage() {
  const { filmId } = useParams();
  const navigate = useNavigate();
  const [filmDetails, setFilmDetails] = useState<Film>();

  useEffect(() => {
    axios
      .get(`https://ghibliapi.vercel.app/films/${filmId}`)
      .then((response) => setFilmDetails(response.data));
  }, [filmId]);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="about-page">
      <div className="banner-container">
        <img src={filmDetails?.movie_banner} alt={filmDetails?.title} className="banner" />
      </div>
      <div className="about-content">
        <div className="details">
          <h1>{filmDetails?.title}</h1>
          <h2>{filmDetails?.original_title}</h2>
          <h3>{filmDetails?.original_title_romanised}</h3>
          <p>{filmDetails?.description}</p>
          <div className="info">
            <p><i className="fas fa-video"></i> <strong> Director: </strong> {filmDetails?.director}</p>
            <p><i className="fas fa-user-tie"></i> <strong> Producer: </strong> {filmDetails?.producer}</p>
            <p><i className="fas fa-calendar-alt"></i> <strong> Release Date: </strong> {filmDetails?.release_date}</p>
            <p><i className="fas fa-clock"></i> {filmDetails?.running_time} minutes </p>
            <p><i className="fas fa-star"></i> <strong> Rotten Tomatoes Score: </strong> {filmDetails?.rt_score}</p>
          </div>
        </div>
        <div className="trailer">
          {filmId && trailerUrls[filmId] && (
            <iframe
              width="560"
              height="315"
              src={trailerUrls[filmId]}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
      <button onClick={handleBack}>Go Back</button>
    </div>
  );
}

export default AboutPage;
