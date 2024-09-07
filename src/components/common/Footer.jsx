import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-7 pb-5 mt-10 text-base sm:text-sm xs:text-xs">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-start space-y-8 lg:space-y-0 md:space-y-0">
          
          <div className="w-full lg:w-1/4 md:w-1/2 sm:w-full px-4">
            <h4 className="text-xl font-semibold mb-4 xs:mb-1">About Us</h4>
            <p className="text-gray-400">
              We bring you the best food from the top restaurants. Freshly prepared, delivered right to your door.
            </p>
          </div>

          <div className="w-full lg:w-1/4 md:w-1/2 sm:w-full px-4">
            <h4 className="text-xl font-semibold mb-4 xs:mb-2">Quick Links</h4>
            <ul className="text-gray-400 space-y-2">
              <li><a href="" className="hover:underline">Restaurants</a></li>
              <li><a href="" className="hover:underline">About Us</a></li>
              <li><a href="" className="hover:underline">Contact Us</a></li>
              <li><a href="" className="hover:underline">Terms of Service</a></li>
              <li><a href="" className="hover:underline">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="w-full lg:w-1/4 md:w-1/2 sm:w-full px-4">
            <h4 className="text-xl font-semibold mb-4 xs:mb-2">Contact Us</h4>
            <p className="text-gray-400">Email: support@foodsite.com</p>
            <p className="text-gray-400">Phone: +123 456 789</p>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-6 mt-6">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex space-x-6 mb-4 lg:mb-0 md:mb-0 sm:mb-0">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white">
                <FaLinkedinIn />
              </a>
            </div>

            <p className="text-gray-400 text-center lg:text-left md:text-left w-full lg:w-auto md:w-auto">
              &copy; 2024 FoodSite. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

