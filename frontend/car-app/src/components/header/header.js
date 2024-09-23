import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 
export const Header = () => {

    return (
        
            <header className="header">
              <div className="header-container">
                <h1>Vehicle Management App</h1>
                <nav className="header-nav">
                  <Link to="/" className="header-button">
                    <i className="fas fa-home"></i> Home
                  </Link>
                  <Link to="/add-vehicle" className="header-button add-vehicle">
                  <i className="fas fa-plus"></i>
                  </Link>
                </nav>
              </div>
            </header>
        
    );
}