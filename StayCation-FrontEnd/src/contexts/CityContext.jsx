import React, { createContext, useState, useEffect } from 'react';
import cityService from './services/cityService';

export const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCities = async () => {
    setLoading(true);
    try {
      const data = await cityService.getAll();
      setCities(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCities();
  }, []);

  return (
    <CityContext.Provider value={{ cities, loading, error, getCities }}>
      {children}
    </CityContext.Provider>
  );
};

export default CityContext;