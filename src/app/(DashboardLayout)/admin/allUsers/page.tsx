"use client";
import ManageUsers from "@/components/modules/dashboard/admin/ManageUsers";
import HeaderPath from "@/components/modules/dashboard/header/HeaderPath";
import { getAllUsers } from "@/services/UserInfo";
import { useEffect, useState } from "react";

const AllUsersPage = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers();
      setAllUsers(users);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <HeaderPath role="Admin" subPath="All Users" />
      <ManageUsers users={allUsers} />
    </div>
  );
};

export default AllUsersPage;
