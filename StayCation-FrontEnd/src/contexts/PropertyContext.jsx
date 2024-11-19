import React, { createContext, useState, useEffect } from 'react';
import propertyService from './propertyService';

export const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getProperties = async () => {
    setLoading(true);
    try {
      const data = await propertyService.getAll();
      setProperties(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  return (
    <PropertyContext.Provider value={{ properties, loading, error, getProperties }}>
      {children}
    </PropertyContext.Provider>
  );
};

export default PropertyContext;