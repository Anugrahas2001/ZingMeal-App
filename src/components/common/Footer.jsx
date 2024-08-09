import React from "react";

const Footer = () => {
  return (
    <div className="w-full grid grid-cols-4 gap-4 mt-12 bg-slate-100">
      <div className=" ml-20">
        <h3 className="text-lg font-medium">ABOUT</h3>
        <ul className="grid grid-rows-4 gap-4 mt-4">
          <li>Contact Us</li>
          <li>About Us</li>
          <li>Careers</li>
          <li>Food Diary Stories</li>
        </ul>
      </div>

      <div className="footer-content ml-16">
        <h3 className="text-lg font-medium">GROUP COMPANIES</h3>
        <ul className="grid grid-rows-4 gap-4 mt-4">
          <li>Zomato</li>
          <li>Swiggy</li>
          <li>Blinkit</li>
          <li>Feeding India</li>
        </ul>
      </div>

      <div className="footer-content ml-16">
        <h3 className="text-lg font-medium">FOR RESTAURANTS</h3>
        <ul className="grid grid-rows-4 gap-4 mt-4">
          <li>Partner With Us</li>
          <li>Apps For You</li>
        </ul>
      </div>

      <div className="footer-content ml-16">
        <h3 className="text-lg font-medium">LEARN MORE</h3>
        <ul className="grid grid-rows-4 gap-4 mt-4">
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
