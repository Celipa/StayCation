import React from 'react';
import { Link } from 'react-router-dom';
import './PropertyStyling.css';

  export const PropertyCard = ({ property }) => {
    return (
    <div className="property">
      <Link to={`/details/${property._id}`} className="details-link">
        <div className="property-card">
          <div className='card-header'>
          <p className="property-price">{property.price} kr / natt</p>
          <p className="property-name">{property.title}</p>
          <p className="property-rating">{property.rating} <img src="https://i.gyazo.com/ed982bec85cda2d6d58eef250830d347.png" className="star"/></p>
          </div>
          <div className='img-box'>
            <img src={property.images[0]} className="property-thumbnail" />
          </div>
          <div className="property-info">
            <div className="property-included">
            <img src="https://i.gyazo.com/2042d095138ff3395abab38724e6941d.png" className="beds" alt="property image"/><p className="included-beds">{property.bedrooms}</p>
            <img src="https://i.gyazo.com/5ee9a3675522f61c2ef416fdc25d2883.png" className="baths" alt="property image"/><p className="included-baths"> {property.bathrooms}</p>
            <div className="property-access">
              {property.accessabilities.map((accessability, index) => (
                <img
                  key={index}
                  src={accessability}
                  className="property-icon"
                  alt={`accessability ${index}`}
                />
              ))}
            </div>
            <div>
            <p className="property-location">{property.locations}</p>
            <p className="property-distance">{property.distance}</p>
            </div>
          </div>
        </div>
        </div>
      </Link>
    </div>
  );
};
