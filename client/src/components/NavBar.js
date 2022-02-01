import React from 'react'
import Wrapper from '../assets/wrappers/Navbar.js'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import Logo from './Logo.js'
import {useAppContext} from '../context/appContext'
import {useState} from 'react'
const NavBar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const {toggleSideBar, logoutUser, user} = useAppContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="btn"
          onClick={toggleSideBar}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle></FaUserCircle>
            {user?.name}
            <FaCaretDown></FaCaretDown>
          </button>

          <div className={showLogout? "dropdown show-dropdown": "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={logoutUser}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default NavBar
