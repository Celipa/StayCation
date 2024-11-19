import React from 'react'
import ReactDOM from 'react-dom/client'
// import { ProductProvider } from './contexts/ProductContext.jsx'
// import { PropertyProvider } from './contexts/PropertyContext.jsx'
import { CityProvider } from './contexts/CityContext.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './layouts/RootLayout.jsx'
// import HomePage from './pages/HomePage.jsx'
// import ProductDetailsPage from './pages/ProductDetailsPage.jsx'
import CityPage from './pages/CityPage.jsx'

import PropertiesPage from './pages/PropertiesPage.jsx'
import PropertyDetailsPage from './pages/PropertyDetailsPage.jsx'
import BookingsPage from './pages/BookingsPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
// import OrdersPage from './pages/OrdersPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <CityPage /> },
      { path: "properties", element: <PropertiesPage /> },
      { path: "details/:propertyId", element: <PropertyDetailsPage /> },
      // { path: "details/:productId", element: <ProductDetailsPage /> },
      { path: 'checkout', element: <CheckoutPage />},
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'contact', element: <ContactPage /> },
      // { path: 'orders', element: <OrdersPage /> },
      { path: 'bookings', element: <BookingsPage /> },
      { path: 'profile', element: <ProfilePage /> }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/contact",
    element: <ContactPage />
  }
])
// Render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CityProvider>
      <RouterProvider router={router} />
    </CityProvider>
  </React.StrictMode>,
)


// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { ProductProvider } from './contexts/ProductContext.jsx'
// import './index.css'
// import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// import RootLayout from './layouts/RootLayout.jsx'
// import HomePage from './pages/HomePage.jsx'
// import ProductDetailsPage from './pages/ProductDetailsPage.jsx'
// import CheckoutPage from './pages/CheckoutPage.jsx'
// import ContactPage from './pages/ContactPage.jsx'
// import LoginPage from './pages/LoginPage.jsx'
// import OrdersPage from './pages/OrdersPage.jsx'
// import ProfilePage from './pages/ProfilePage.jsx'
// import RegisterPage from './pages/RegisterPage.jsx'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     children: [
//       { index: true, element: <HomePage /> },
//       { path: "details/:productId", element: <ProductDetailsPage /> },
//       { path: 'checkout', element: <CheckoutPage />},
//       { path: 'login', element: <LoginPage /> },
//       { path: 'register', element: <RegisterPage /> },
//       { path: 'contact', element: <ContactPage /> },
//       { path: 'orders', element: <OrdersPage /> },
//       { path: 'profile', element: <ProfilePage /> }
//     ]
//   },
//   {
//     path: "/login",
//     element: <LoginPage />
//   },
//   {
//     path: "/register",
//     element: <RegisterPage />
//   },
//   {
//     path: "/contact",
//     element: <ContactPage />
//   }
// ])
// // Render the application
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <ProductProvider>
//       <RouterProvider router={router} />
//     </ProductProvider>
//   </React.StrictMode>,
// )