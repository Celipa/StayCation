import { useEffect, useContext } from "react";
import { PropertyContext } from '../contexts/PropertyContext';
import Categories from '../components/Categories';
import '../components/Property/PropertyStyling.css';

function PropertiesPage() {
  const { loading, error, getProperties } = useContext(PropertyContext);

  useEffect(() => {
    getProperties();
  }, []);

  if(error) return (
    <div className="mt-10">
      <p className="text-red-600">{error}</p>
    </div>
  );

  return (
    <div className="Properties-page">
      {
        loading 
        ? <p>Loading...</p> 
        : <Categories /> // Render Categories instead of PropertyList
      }
    </div>
  );
}

export default PropertiesPage;