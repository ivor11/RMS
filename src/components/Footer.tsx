// Footer.tsx
import React from 'react';
import './Footer.css';

const Footer = () => {
 const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-content">
       <p>© {currentYear} My Company. All rights reserved.</p>
        {/* Add social media links, contact information, etc. */}
      </div>
    </footer>
  );
};

export default Footer;