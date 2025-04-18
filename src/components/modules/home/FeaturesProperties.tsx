import React from "react";
import PropertyCard from "../property/PropertyCard";

const featuredProperties = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    location: "Downtown, City Center",
    price: 1250,
    bedrooms: 2,
    bathrooms: 1,
    area: 850,
    imageUrl:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3",
    isNew: true,
  },
  {
    id: "2",
    title: "Cozy Studio near University",
    location: "University District",
    price: 800,
    bedrooms: 1,
    bathrooms: 1,
    area: 450,
    imageUrl:
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?ixlib=rb-4.0.3",
  },
  {
    id: "3",
    title: "Spacious Family Home",
    location: "Suburbia Neighborhood",
    price: 1800,
    bedrooms: 4,
    bathrooms: 2.5,
    area: 1800,
    imageUrl:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3",
  },
  {
    id: "4",
    title: "Luxury Penthouse with View",
    location: "City Heights",
    price: 3200,
    bedrooms: 3,
    bathrooms: 2,
    area: 1600,
    imageUrl:
      "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?ixlib=rb-4.0.3",
    isNew: true,
  },
];

const FeaturesProperties = () => {
  return (
    <section className="py-12 px-4">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our hand-picked selection of the finest rental properties
            available right now.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesProperties;
