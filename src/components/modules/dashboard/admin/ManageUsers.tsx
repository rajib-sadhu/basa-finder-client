"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
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

interface ManageUsersProps {
  users: IUser[];
}

const ManageUsers = ({ users }: ManageUsersProps) => {
  const [userList, setUserList] = useState(users);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(userList.length / itemsPerPage);

  const paginatedUsers = userList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const updatedUser = await updateUserRole(userId, newRole);
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
            {paginatedUsers.map((user, i) => (
              <TableRow key={user._id}>
                <TableCell>
                  {(currentPage - 1) * itemsPerPage + i + 1}
                </TableCell>
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

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-10 p-0 ${
                  currentPage === pageNum
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : ""
                }`}
              >
                {pageNum}
              </Button>
            )
          )}

          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
