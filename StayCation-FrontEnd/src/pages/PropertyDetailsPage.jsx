import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BiSolidCartAdd } from "react-icons/bi";
import { useCart } from "../contexts/cartContext";
import './css/PropertyDetailsPage.css';

// Define the PropertyDetailsPage component
function PropertyDetailsPage() {

  // Get the property ID from the URL parameters
  const { propertyId } = useParams();

  // Get the addToCart function from the cart context
  const { addToCart } = useCart();

  // Define state variables for the property, loading status, error message, and active image index
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeImg, setActiveImg] = useState(0);

  // Define a useEffect hook to fetch the property data when the component mounts
  useEffect(() => {
    const getProperty = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/api/properties/${propertyId}`);

        setProperty(res.data);
        setLoading(false);
        
      } catch (err) {
        setError('Something went wrong!');
        console.error(err.message);
      }
    };

    getProperty();
  }, [propertyId]);

  // Define a function to handle the click event of the "Add to Cart" button
  const handleClick = () => {
    addToCart(property);
  };

  // Render a loading message if the data is still being fetched
  if(loading) {
    return (
      <p>Loading...</p>
    );
  }

  // Render nothing if there's no property data
  if(!property) return null;

  // Render the property details
  return (
    <div className="Propertydetail-body">
    <div className="Property-detail">
      <div className="Property-images">
        <img src={property.images[activeImg]} alt="property image" className="big-image" />
        <div className="Images-small">
          {property.images.map((image, index) => (
            <div key={index} onClick={() => setActiveImg(index)} className="next-img">
              <img src={image} className="property-img"/>
            </div>
          ))}
        </div>
      </div>
      <div className="details">
        <h1 className="property-name">{property.title}</h1>
        <p>___________________________________________________________</p>
        <div className="purchase-details">
          <p className="property-price">Pris/natt: <span>{property.price}</span> :-</p>
          <p className="property-rating">Betyg: <span>{property.rating}</span> / 5</p>
          <div className="property-included">
          <p className="property-included"><img src="https://i.gyazo.com/f30437cc92616d37ced4896cce4ac36b.png" className="property-info" /></p>
          <p className="property-bedrooms"><img src="https://i.gyazo.com/2042d095138ff3395abab38724e6941d.png" className="property-beds" /> {property.bedrooms}</p>
          <p className="property-bathrooms"><img src="https://i.gyazo.com/8e26f7f6cb666f9eeeba2ada259d97ab.png" className="property-baths"/> {property.bathrooms}</p>
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
            <p className="property-desc">{property.description}</p>
            <div className="tillbehör">{property.location}</div>
            <div>
            </div>
          <button onClick={handleClick} className="Add-btn">
            Boka Nu
            <BiSolidCartAdd className="CartIcon" />
          </button>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}
export default PropertyDetailsPage;