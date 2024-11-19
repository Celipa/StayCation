import { PropertyCard } from "./PropertyCard";
import './PropertyStyling.css';

export const PropertyList = ({ properties }) => {
  return (
    <div className="property-body">
      <div className="property-header">
        <h1 className="property-title"></h1>
      </div>
      <div className="prop-page-items">
        <div className="property-count">
          <p>Antal Träffar: {properties.length}</p>
        </div>
        <div className="property-filter">
          <div className="filter-items">
            <label htmlFor="property-filter">Filter by:</label>
            <select name="property-filter" id="property-filter">
              <option value="price">Price</option>
              <option value="rating">Rating</option>
              <option value="bedrooms">Bedrooms</option>
              <option value="bathrooms">Bathrooms</option>
            </select>
          </div>
        </div>
      </div>
      <div className="properties-container">
        { properties.map(property => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

PropertyList.Skeleton = () => {
  return (
    <div className="properties-container">
      <div className="property-skeleton" />
    </div>
  );
};