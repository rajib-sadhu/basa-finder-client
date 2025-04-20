"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IUser } from "@/types";

interface ManageUsersProps {
  users: IUser[];
}

const ManageUsers = ({ users }: ManageUsersProps) => {
  return (
    <div className="p-4 md:p-6 aspect-video rounded-xl bg-emerald-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-2xl font-bold">Manage Users</h3>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Phone Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: IUser, i: number) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell>{user?.name}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell className="capitalize">{user?.role}</TableCell>
                <TableCell className="capitalize">
                  {user?.phoneNumber}
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
