import { Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar/Navbar"
import Providers from "../components/Providers"
import { Footer } from "../components/Footer"
import './RootLayout.css'

function RootLayout() {
  return (
    <Providers>
      <div className="Body">
        <Navbar />
        
        <div className="StayCation">
          <Outlet />
        </div>
      </div>
      <Footer />
    </Providers>
  )
}
export default RootLayout