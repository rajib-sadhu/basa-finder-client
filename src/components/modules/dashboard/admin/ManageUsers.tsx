"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IUser } from "@/types";
import { updateUserActiveStatus, updateUserRole } from "@/services/UserInfo";
import { Select } from "@/components/ui/select";

interface ManageUsersProps {
  users: IUser[];
}

const ManageUsers = ({ users }: ManageUsersProps) => {
  const [userList, setUserList] = useState(users);

  const handleToggle = async (userId: string) => {
    try {
      await updateUserActiveStatus(userId);

      setUserList((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, isActive: !user.isActive } : user
        )
      );
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };
  // change role
  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const updatedUser = await updateUserRole(userId, newRole);
      console.log("Role update successful:", updatedUser);

      setUserList((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, role: updatedUser.role } : user
        )
      );
    } catch (err) {
      console.error("Failed to update role:", err);
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
              <TableHead>Change Role</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userList.map((user, i) => (
              <TableRow key={user._id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>
                  <Select
                    value={user.role}
                    onValueChange={(newRole) =>
                      handleRoleChange(user._id!, newRole)
                    }
                  >
                    <SelectTrigger className="p-1 rounded-md text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="landlord">Landlord</SelectItem>
                      <SelectItem value="tenant">Tenant</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>

                <TableCell className="capitalize">
                  <Button
                    onClick={() => handleToggle(user._id!)}
                    className={`px-2 py-1 text-white text-sm ${
                      user.isActive ? "bg-emerald-700" : "bg-red-700"
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
