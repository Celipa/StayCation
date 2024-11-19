import React, { useEffect, useRef, useState } from 'react';
import { FiAlignJustify } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { Dropdown } from "../Dropdown";
import { useNavigate } from 'react-router-dom';
import { useCart } from "../../contexts/cartContext";
import axios from 'axios';
import './Navbar.css'

export const Navbar = ({ setSelectedCategory }) => {
  const [isUserDropdownActive, setUserDropdownActive] = useState(false);
  const [isGearDropdownActive, setGearDropdownActive] = useState(false);
  const [isNavbarDropdownActive, setNavbarDropdownActive] = useState(false);
  
  const navigate = useNavigate();
  const userDropdownRef = useRef(null);
  const GearDropdownRef = useRef(null);
  const { totalQuantity } = useCart()
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = () => {
    // Clear user's session or authentication token
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    // Refresh the page
    window.location.reload();
    console.log('User logged out!');
    alert('You are now logged out!');
  };
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/api/properties')
      .then(response => {
        const uniqueCategories = [...new Set(response.data.map(item => item.category))];
        setCategories(uniqueCategories);
        
      })
      .catch(error => console.error(`Error: ${error}`));
  }, []);
  const categoriesWithReset = ['All Properties', ...categories];

  return (
    <>
      <div className="Navbar2">
      <header>
        <section className="header-items">
          <div className="menu">
            </div>
            <div className='StayCation-logo'>
            <Link to="/">
            <img src='\src\layouts\Staycation.png' alt="Staycation Logo" className='SC-logo'/>
             </Link>
            </div>
            
            
            <nav className="navbar">
              <NavLink to="/">Hem</NavLink>
              <NavLink to="/contact">Kontakta Oss</NavLink>
            </nav>

            
            <div className="icons">
            <div className="cart">
            <ul>
                <li className="Cart">
                  { totalQuantity > 0 && 
                  <div className="weeeee">
                  </div>}
                  <Dropdown>
                    <FaShoppingCart className='cart-icon'/>
                    <span className="cart-items-total">{totalQuantity}</span>
                  </Dropdown>
                </li>
              </ul>
            </div>
              <NavLink to="#" className="user" onClick={() => setUserDropdownActive(!isUserDropdownActive)}>
                <FaUser />
               {isUserDropdownActive && (
            <div className="profile" ref={userDropdownRef}>
              <button onClick={() => setUserDropdownActive(false)}></button>
              <ul>
                <li><NavLink className="auth-link" to="/login">Login</NavLink></li>
                <li><NavLink className="auth-link" to="/register">Register</NavLink></li>
                    </ul>
                  </div>
                )}
            </NavLink>
            <NavLink to="#" className="gear" onClick={() => setGearDropdownActive(!isGearDropdownActive)}>
              <FiSettings />
                {isGearDropdownActive && (
                <div className="help" ref={GearDropdownRef}>
                    <button onClick={() => setGearDropdownActive(false)}></button>
                    <ul>
                    <li className='hidden'><NavLink className="hidden" to="/orders">Orders</NavLink></li>
                <li className='hidden'><NavLink className="hidden" to="/profile">Profile</NavLink></li>
                <li className='hidden'><NavLink className="hidden" to="/login" onClick={logout}>Logout</NavLink></li>
                    </ul>
                </div>
                )}
            </NavLink>
            </div> 
          </section>
        </header>
      </div>
    </>
  )
}
export default Navbar;



// import React, { useEffect, useRef, useState } from 'react';
// import { FiAlignJustify } from "react-icons/fi";
// import { FaShoppingCart } from "react-icons/fa";
// import { FaUser } from "react-icons/fa";
// import { FiSettings } from "react-icons/fi";
// import { Link, NavLink } from "react-router-dom";
// import { Dropdown } from "./Dropdown";
// import { useNavigate } from 'react-router-dom';
// import { useCart } from "../contexts/cartContext";
// import axios from 'axios';
// import './Navbar.css'

// export const Navbar = ({ setSelectedCategory }) => {
//   const [isUserDropdownActive, setUserDropdownActive] = useState(false);
//   const [isGearDropdownActive, setGearDropdownActive] = useState(false);
//   const [isNavbarDropdownActive, setNavbarDropdownActive] = useState(false);
  
//   const navigate = useNavigate();
//   const userDropdownRef = useRef(null);
//   const GearDropdownRef = useRef(null);
//   const { totalQuantity } = useCart()
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const logout = () => {
//     // Clear user's session or authentication token
//     localStorage.removeItem('token');
//     setIsLoggedIn(false);
//     // Refresh the page
//     window.location.reload();
//     console.log('User logged out!');
//     alert('You are now logged out!');
//   };
//   const [categories, setCategories] = useState([]);
//   useEffect(() => {
//     axios.get('http://localhost:3000/api/products')
//       .then(response => {
//         const uniqueCategories = [...new Set(response.data.map(item => item.category))];
//         setCategories(uniqueCategories);
        
//       })
//       .catch(error => console.error(`Error: ${error}`));
//   }, []);
//   const categoriesWithReset = ['All Products', ...categories];

//   return (
//     <>
//       <div className="Navbar2">
//       <header>
//         <section className="header-items">
//           <div className="menu">
//             <NavLink to="#" className="menubar" onClick={() => setNavbarDropdownActive(!isNavbarDropdownActive)}>
//               <FiAlignJustify />
//               {isNavbarDropdownActive && (
//                 <div className="categories">
//                   <button onClick={() => setNavbarDropdownActive(false)}></button>
//                   <ul>
//                   {categoriesWithReset.map((category, index) => (
//       <li key={index} onClick={() => { setSelectedCategory(category === 'All Products' ? '' : category); setNavbarDropdownActive(false); }}>{category}</li>
//     ))}
//                   </ul>
//                 </div>
//               )}
//                 </NavLink>
//             </div>   
//             <Link to="/" className="logo">ElectroVerse</Link>
//             {/* <div className="search">
//               <input type="text" placeholder="Search" />
//               <button type="submit"><i className="fas fa-search"></i></button>
//             </div> */}
//             <nav className="navbar">
//               <NavLink to="/">home</NavLink>
//               <NavLink to="/contact">Contact us</NavLink>
//             </nav>


//             <div className="icons">
//             <div className="cart">
//             <ul>
//                 <li className="Cart">
//                   { totalQuantity > 0 && 
//                   <div className="weeeee">
//                   </div>}
//                   <Dropdown>
//                     <FaShoppingCart className='cart-icon'/>
//                     <span className="cart-items-total">{totalQuantity}</span>
//                   </Dropdown>
//                 </li>
//               </ul>
//             </div>
//               <NavLink to="#" className="user" onClick={() => setUserDropdownActive(!isUserDropdownActive)}>
//                 <FaUser />
//                {isUserDropdownActive && (
//             <div className="profile" ref={userDropdownRef}>
//               <button onClick={() => setUserDropdownActive(false)}></button>
//               <ul>
//                 <li><NavLink className="auth-link" to="/login">Login</NavLink></li>
//                 <li><NavLink className="auth-link" to="/register">Register</NavLink></li>
//                     </ul>
//                   </div>
//                 )}
//             </NavLink>
//             <NavLink to="#" className="gear" onClick={() => setGearDropdownActive(!isGearDropdownActive)}>
//               <FiSettings />
//                 {isGearDropdownActive && (
//                 <div className="help" ref={GearDropdownRef}>
//                     <button onClick={() => setGearDropdownActive(false)}></button>
//                     <ul>
//                     <li className='hidden'><NavLink className="hidden" to="/orders">Orders</NavLink></li>
//                 <li className='hidden'><NavLink className="hidden" to="/profile">Profile</NavLink></li>
//                 <li className='hidden'><NavLink className="hidden" to="/login" onClick={logout}>Logout</NavLink></li>
//                     </ul>
//                 </div>
//                 )}
//             </NavLink>
//             </div> 
//           </section>
//         </header>
//       </div>
//     </>
//   )
// }
// export default Navbar;