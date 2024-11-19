import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar/Navbar';
import { PropertyList } from './Property/PropertyList';

const Categories = () => {
  const [properties, setProperties] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/properties?category=${selectedCategory}`);
        setProperties(response.data);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    fetchProperties();
  }, [selectedCategory]);

  return (
    <div>
      <Navbar setSelectedCategory={setSelectedCategory} />
      <PropertyList properties={properties} />
    </div>
  );
};

export default Categories;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navbar from './Navbar';
// import { ProductList } from './ProductList';

// const Categories = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/api/products?category=${selectedCategory}`);
//         setProducts(response.data);
//       } catch (error) {
//         console.error(`Error: ${error}`);
//       }
//     };

//     fetchProducts();
//   }, [selectedCategory]);

//   return (
//     <div>
//       <Navbar setSelectedCategory={setSelectedCategory} />
//       <ProductList products={products} />
//     </div>
//   );
// };

// export default Categories;