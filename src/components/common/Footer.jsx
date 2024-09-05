import React from "react";

const Footer = () => {
  return (
    <div className="w-full grid grid-cols-4 gap-4 mt-12 lg:mt-12 md:mt-8 bg-slate-100 text-base lg:text-base md:text-sm sm:text-sm h-40 xs:text-xs sticky bottom-0">
      <div className="ml-20 mr-20 lg:ml-20 lg:mr-20 md:ml-10 md:mr-10 sm:ml-7 sm:mr-7 xs:ml-4 xs:mr-4">
        <h3 className="font-medium xs:text-xs">ABOUT</h3>
        <ul className="grid gap-4 mt-4 md:mt-2">
          <li className="mt-2">Contact Us</li>
          <li className="mt-2">About Us</li> 
        </ul>
      </div>

      <div className="footer-content">
        <h3 className="font-medium">GROUP COMPANIES</h3>
        <ul className="grid gap-2 mt-3">
          <li>Zomato</li>
          <li>Swiggy</li>
          <li>Blinkit</li>
          {/* <li>Feeding India</li> */}
        </ul>
      </div>

      <div className="footer-content">
        <h3 className="font-medium">FOR RESTAURANTS</h3>
        <ul className="grid gap-4 mt-4">
          <li>Partner With Us</li>
          <li>Apps For You</li>
        </ul>
      </div>

      <div className="footer-content">
        <h3 className="font-medium">LEARN MORE</h3>
        <ul className="grid gap-4 mt-4">
          <li>Privacy</li>
          <li>Security</li>
          <li>Terms</li>
          {/* <li>Sitemap</li> */}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
