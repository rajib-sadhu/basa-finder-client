import HeaderPath from "@/components/modules/dashboard/header/HeaderPath";
import UserProfile from "@/components/modules/dashboard/tenant/UserProfile";
import { getSingleUser } from "@/services/UserInfo";

const LandlordProfilePage = async () => {
  const userData = await getSingleUser();

  return (
    <div>
      <HeaderPath role="Landlord" subPath="Profile" />
      <UserProfile userData={userData} />
    </div>
  );
};

export default LandlordProfilePage;
