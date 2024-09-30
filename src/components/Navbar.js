import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import '../assets/styles/Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <li className="navbar-item">
        <FontAwesomeIcon
          icon={faMoneyBill}
          className="navbar-icon"
        />
        <p>Convertir</p>
      </li>
    </nav>
  )
}

export default Navbar