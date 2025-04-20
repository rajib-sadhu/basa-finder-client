import ManageUsers from "@/components/modules/dashboard/admin/ManageUsers";
import HeaderPath from "@/components/modules/dashboard/header/HeaderPath";
import { IUser } from "@/types";

const AllUsersPage = async () => {
  const res = await fetch("http://localhost:5000/api/users", {
    cache: "no-store",
  });

  const json = await res.json();
  const users: IUser[] = json.data;

  return (
    <div>
      <HeaderPath role="Admin" subPath="All Users" />
      <ManageUsers users={users} />
    </div>
  );
};

export default AllUsersPage;
