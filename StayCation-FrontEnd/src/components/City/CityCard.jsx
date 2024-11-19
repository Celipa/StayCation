import React from 'react';
import { Link } from 'react-router-dom';
import './CityStyling.css';

export const CityCard = ({ city }) => {
  return (
    <div className="city-card">
      <Link to={`/properties`} className="details-link">
      <img src={city.image} alt={city.cityName} className="city-img" />
      <h2 className="city-name">{city.cityName}</h2>
      </Link>
    </div>
  );
};
