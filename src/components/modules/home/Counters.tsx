"use client";

import { useEffect, useState } from "react";
import { getAllRentals } from "@/services/RentalsService";
import { getAllRequests } from "@/services/requestService";
import { getAllUsers } from "@/services/UserInfo";
import CountUp from "react-countup";
import { Users, Home, Handshake } from "lucide-react";

const Counters = () => {
  const [counts, setCounts] = useState([
    { label: "Total Users", icon: Users, count: 0 },
    { label: "Total Rentals", icon: Home, count: 0 },
    { label: "Total Requests", icon: Handshake, count: 0 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const [users, rentals, requests] = await Promise.all([
        getAllUsers(),
        getAllRentals(),
        getAllRequests(),
      ]);

      setCounts([
        { label: "Total Users", icon: Users, count: users?.length || 0 },
        { label: "Total Rentals", icon: Home, count: rentals?.length || 0 },
        {
          label: "Total Requests",
          icon: Handshake,
          count: requests?.length || 0,
        },
      ]);
    };

    fetchData();
  }, []);

  return (
    <section className="bg-gray-50 py-16">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white">
          {counts.map(({ label, icon: Icon, count }, idx) => (
            <div key={idx} className=" p-6 text-center group">
              <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-emerald-100 group-hover:bg-emerald-200 transition-colors mb-4">
                <Icon className="text-emerald-600" size={28} />
              </div>
              <h3 className="text-4xl font-bold text-gray-800">
                <CountUp end={count} duration={2} />
              </h3>
              <p className="text-gray-500 mt-2">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Counters;
