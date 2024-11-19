import { CityCard } from "./CityCard";
import './CityStyling.css';

const CityList = ({ cities }) => {
  return (
    <div className="city-body">
      <div className="city-header">
        <h1 className="city-title">Vart vill du boka?</h1>
      </div>
      <div className="search">
              <input type="text" className="SökBar" placeholder="Sök..." />
              <button type="submit" className="SearchIcon"><i className="fas fa-search"></i></button>
            </div>
      <div className="cities-container">
        <div className="StayCation-Slogan">
        <h2 className="Slogan">Upptäck världen hemifrån – din bästa semester väntar runt hörnet!</h2> </div>
          {cities.map(city => (
            <CityCard key={city._id} city={city} />
          ))}
        </div>
    </div>
  );
};

CityList.Skeleton = () => {
  return (
    <div className="cities-container">
      <div className="city-skeleton" />
    </div>
  );
};

export default CityList;