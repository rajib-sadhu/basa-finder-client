import ManageUsers from "@/components/modules/dashboard/admin/ManageUsers";
import HeaderPath from "@/components/modules/dashboard/header/HeaderPath";
import { getAllUsers } from "@/services/UserInfo";

const AllUsersPage = async () => {
  const users = await getAllUsers();

  return (
    <div>
      <HeaderPath role="Admin" subPath="All Users" />
      <ManageUsers users={users} />
    </div>
  );
};

export default AllUsersPage;
