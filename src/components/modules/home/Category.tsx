"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import { FaMapMarkerAlt, FaBed, FaTags } from "react-icons/fa";

const categories = [
  { label: "Cox Bazar", icon: <FaMapMarkerAlt /> },
  { label: "Salt Lake", icon: <FaMapMarkerAlt /> },
  { label: "Gulshan", icon: <FaMapMarkerAlt /> },
  { label: "Kolkata", icon: <FaMapMarkerAlt /> },
  { label: "1 Bedroom", icon: <FaBed /> },
  { label: "2 Bedroom", icon: <FaBed /> },
  { label: "3 Bedroom", icon: <FaBed /> },
  { label: "Under $500", icon: <FaTags /> },
  { label: "Under $1000", icon: <FaTags /> },
  { label: "TV", icon: <FaTags /> },
  { label: "Wifi", icon: <FaTags /> },
  { label: "Air Conditioning", icon: <FaTags /> },
  { label: "Free Parking", icon: <FaTags /> },
  { label: "Pool", icon: <FaTags /> },
  { label: "Gym", icon: <FaTags /> },
];

const Category = () => {
  return (
    <div className="bg-gray-50 pb-16 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Dynamic Categories
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-6">
        Explore a variety of categories to find the perfect rental for your
        needs.
      </p>
      <Marquee speed={50} pauseOnHover gradient>
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex items-center gap-2 mx-3 px-4 py-2  text-gray-700 hover:bg-emerald-100 transition duration-200 cursor-pointer"
          >
            <span className="text-emerald-600">{category.icon}</span>
            {category.label}
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Category;
