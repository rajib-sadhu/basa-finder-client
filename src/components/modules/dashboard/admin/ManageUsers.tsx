"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IUser } from "@/types";
import { updateUserActiveStatus } from "@/services/UserInfo";

interface ManageUsersProps {
  users: IUser[];
}

const ManageUsers = ({ users }: ManageUsersProps) => {
  const handleToggle = async (userId: string) => {
    try {
      await updateUserActiveStatus(userId);
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  return (
    <div className="p-4 md:p-6 rounded-xl bg-emerald-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-2xl font-bold">Manage Users</h3>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, i) => (
              <TableRow key={user._id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
                <TableCell className="capitalize">
                  <Button
                    onClick={() => handleToggle(user._id!)}
                    className={`px-2 py-1 text-white text-sm ${
                      user.isActive ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {user.isActive ? "Active" : "Blocked"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageUsers;
