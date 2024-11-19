// import { useEffect, useContext } from "react";
// import { ProductContext } from '../contexts/ProductContext';
// import Categories from '../components/Categories';
// import '../components/ProductStyling.css';

// function HomePage() {
//   const { loading, error, getProducts } = useContext(ProductContext);

//   useEffect(() => {
//     getProducts();
//   }, []);

//   if(error) return (
//     <div className="mt-10">
//       <p className="text-red-600">{error}</p>
//     </div>
//   );

//   return (
//     <div className="Home page">
//       {
//         loading 
//         ? <p>Loading...</p> 
//         : <Categories /> // Render Categories instead of ProductList
//       }
//     </div>
//   );
// }
// export default HomePage;