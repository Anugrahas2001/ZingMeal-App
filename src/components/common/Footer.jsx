import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <h3>ABOUT</h3>
        <ul className="foodter-list">
          <li>Contact Us</li>
          <li>About Us</li>
          <li>Careers</li>
          <li>Food Diary Stories</li>
        </ul>
      </div>

      <div className="footer-content">
        <h3>GROUP COMPANIES</h3>
        <ul className="foodter-list">
          <li>Zomato</li>
          <li>Swiggy</li>
          <li>Blinkit</li>
          <li>Feeding India</li>
        </ul>
      </div>

      <div className="footer-content">
        <h3>FOR RESTAURANTS</h3>
        <ul className="foodter-list">
          <li>Partner With Us</li>
          <li>Apps For You</li>
        </ul>
      </div>

      <div className="footer-content">
        <h3>LEARN MORE</h3>
        <ul className="foodter-list">
          <li>Privacy</li>
          <li>Security</li>
          <li>Terms</li>
          <li>Sitemap</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
