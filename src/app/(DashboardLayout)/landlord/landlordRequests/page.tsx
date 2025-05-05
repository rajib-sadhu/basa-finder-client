// app/landlord/listedRentals/page.tsx
import HeaderPath from "@/components/modules/dashboard/header/HeaderPath";
import RentalRequests from "@/components/modules/dashboard/landlord/RentalRequests";
import { getLandlordRequests } from "@/services/requestService";

const LandlordRequestsPage = async () => {
  const landlordRequests = await getLandlordRequests();

  return (
    <div>
      <HeaderPath role="Landlord" subPath="Rental Requests" />
      <RentalRequests landlordRequests={landlordRequests} />
    </div>
  );
};

export default LandlordRequestsPage;
