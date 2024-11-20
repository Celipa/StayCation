import React from 'react'
import ReactDOM from 'react-dom/client'
import { CityProvider } from './contexts/CityContext.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './layouts/RootLayout.jsx'
import CityPage from './pages/CityPage.jsx'

import PropertiesPage from './pages/PropertiesPage.jsx'
import PropertyDetailsPage from './pages/PropertyDetailsPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
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
      { path: 'checkout', element: <CheckoutPage />},
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'contact', element: <ContactPage /> },
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
