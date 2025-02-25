import React from 'react';
import './Header.css'; // Optional: For styling

interface HeaderProps { //Optional props
  title?: string;   // Example: A title for the header
  // Add more props as needed
}

const Header: React.FC<HeaderProps> = ({ title = "My Awesome Site" }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>{title}</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;