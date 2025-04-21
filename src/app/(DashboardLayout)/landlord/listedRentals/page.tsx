import HeaderPath from "@/components/modules/dashboard/header/HeaderPath";
import ManageLandlordRentals from "@/components/modules/rental";
import { getMyRentals } from "@/services/RentalsService";

const ListedRentalsPage = async () => {
  // const [myListings, setMyListings] = useState([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  const lists = await getMyRentals();
  //     setMyListings(lists);
  //   };
  //   fetchUsers();
  // }, []);

  return (
    <div>
      <HeaderPath role="LandLord" subPath="Your Listings" />
      <ManageLandlordRentals myListings={lists} />
    </div>
  );
};

export default ListedRentalsPage;
