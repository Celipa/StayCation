import CartContextProvider from '../contexts/cartContext';
import { PropertyProvider } from '../contexts/PropertyContext';

const Providers = ({ children }) => {
  return (
    <PropertyProvider>
      <CartContextProvider>
        {children}
      </CartContextProvider>
    </PropertyProvider>
  );
};

export default Providers;
// import CartContextProvider from '../contexts/cartContext';
// import { ProductProvider } from '../contexts/ProductContext';

// const Providers = ({ children }) => {
//   return (
//     <ProductProvider>
//       <CartContextProvider>
//         {children}
//       </CartContextProvider>
//     </ProductProvider>
//   );
// };

// export default Providers;