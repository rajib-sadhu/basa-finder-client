"use client"

import HeaderPath from "@/components/modules/dashboard/header/HeaderPath";
import ManageLandlordRentals from "@/components/modules/rental";
import { getMyRentals } from "@/services/RentalsService";
import { useEffect, useState } from "react";

const ListedRentalsPage = () => {
  const [myListings, setMyListings] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const lists = await getMyRentals();
      setMyListings(lists);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <HeaderPath role="LandLord" subPath="Your Listings" />
      <ManageLandlordRentals myListings={myListings} />
    </div>
  );
};

export default ListedRentalsPage;
