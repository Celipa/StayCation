import { useEffect, useContext } from "react";
import { CityContext } from '../contexts/CityContext';
import CityList from '../components/City/CityList';
import '../components/City/CityStyling.css';

function CityPage() {
  const { cities, loading, error, getCities } = useContext(CityContext);

  useEffect(() => {
    getCities();
  }, []);

  if (error) return (
    <div className="mt-10">
      <p className="text-red-600">{error}</p>
    </div>
  );

  return (
    <div className="CityPage">
      {loading ? (
        <p className="text-center mt-10">Loading...</p>
      ) : (
        <CityList cities={cities} />
      )}
    </div>
  );
}

export default CityPage;