import HeaderPath from "@/components/modules/dashboard/header/HeaderPath";
import CreateRental from "@/components/modules/rental/CreateRental";

import React from "react";

const CreateRentalPage = () => {
  return (
    <div>
      <HeaderPath role="Landlord" subPath="Create Rental" />
      <CreateRental />
    </div>
  );
};

export default CreateRentalPage;
