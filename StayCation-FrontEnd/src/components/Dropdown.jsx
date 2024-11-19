import ReactDOM from 'react-dom'
import { useState } from "react"
import { ShoppingCart } from "./ShoppingCart"
import './Dropdown.css'

export const Dropdown = ({ children }) => {

  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
    { isOpen && <DropdownBg setIsOpen={setIsOpen} />}
    <div className="menu-button">
      <div>
        <button onClick={() => setIsOpen(state => !state)} type="button" className="DropdownDotJSX">
          {children}
        </button>
      </div>

      { isOpen && (
        <div className="cart-item">
          <div className="cart-product" role="none">
          <ShoppingCart setIsOpen={setIsOpen} className="dropdown" />
          </div>
        </div>
      )}


    </div>
  </>
  )
}


const DropdownBg = ({setIsOpen}) => {
  return ReactDOM.createPortal((
    <div className="cart-card" onClick={() => setIsOpen(false)}/>
  ), document.querySelector('#modal'))
}