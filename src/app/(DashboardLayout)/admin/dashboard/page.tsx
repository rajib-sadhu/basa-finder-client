import HeaderPath from "@/components/modules/dashboard/header/HeaderPath";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Home, Handshake, Check, X, Clock } from "lucide-react";
import { getAllRentals } from "@/services/RentalsService";
import { getAllRequests } from "@/services/requestService";
import { getAllUsers } from "@/services/UserInfo";
import { ITenantRequest, IUser, IRental } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChart, PieChart } from "@/components/ui/core/charts"; // You'll need to create these components

const AdminDashboard = async () => {
  const [users, rentals, requests] = await Promise.all([
    getAllUsers(),
    getAllRentals(),
    getAllRequests(),
  ]);

  // User data
  const activeUsers =
    users.length && users.filter((u: IUser) => u.isActive).length;
  const blockedUsers = users.length && users.length - activeUsers;

  // Request data
  const pendingRequests =
    requests.length &&
    requests.filter((r: ITenantRequest) => r.status === "pending").length;
  const rejectedRequests =
    requests.length &&
    requests.filter((r: ITenantRequest) => r.status === "rejected").length;
  const paidRequests =
    requests.length &&
    requests.filter((r: ITenantRequest) => r.paymentStatus === "paid").length;
  const approvedRequests =
    requests.length &&
    requests.filter((r: ITenantRequest) => r.status === "approved").length;

  // Rental data
  const activeRentals =
    rentals.length && rentals.filter((r: IRental) => r.availability).length;
  const occupiedRentals = rentals.length && rentals.length - activeRentals;

  // Chart data
  const barChartData = {
    labels: ["Users", "Rentals"],
    datasets: [
      {
        label: "Active",
        data: [activeUsers, activeRentals],
        backgroundColor: "#10b981", // emerald-500
      },
      {
        label: "Inactive",
        data: [blockedUsers, occupiedRentals],
        backgroundColor: "#ef4444", // red-500
      },
    ],
  };

  const pieChartData = {
    labels: ["Pending", "Paid", "Approved", "Rejected"],
    datasets: [
      {
        data: [
          pendingRequests,
          paidRequests,
          approvedRequests,
          rejectedRequests,
        ],
        backgroundColor: [
          "#f59e0b", // amber-500
          "#10b981", // emerald-500
          "#3b82f6", // blue-500
          "red", // blue-500
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <HeaderPath role="Admin" subPath="Dashboard" />

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Users Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <div className="flex items-center justify-between mt-4">
              <div className="space-y-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Check className="h-4 w-4 mr-1 text-green-500" />
                  <span>Active: {activeUsers}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <X className="h-4 w-4 mr-1 text-red-500" />
                  <span>Blocked: {blockedUsers}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/allUsers">Manage</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Rentals Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rentals</CardTitle>
            <Home className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rentals.length}</div>
            <div className="flex items-center justify-between mt-4">
              <div className="space-y-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Check className="h-4 w-4 mr-1 text-green-500" />
                  <span>Available: {activeRentals}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <X className="h-4 w-4 mr-1 text-red-500" />
                  <span>Occupied: {occupiedRentals}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/allLists">Manage</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Requests Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Requests</CardTitle>
            <Handshake className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requests.length}</div>
            <div className="flex items-center justify-between mt-4">
              <div className="space-y-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1 text-yellow-500" />
                  <span>Pending: {pendingRequests}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Check className="h-4 w-4 mr-1 text-green-500" />
                  <span>Paid: {paidRequests}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Bar Chart - Users vs Rentals */}
        <Card>
          <CardHeader>
            <CardTitle>Users & Rentals Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <BarChart data={barChartData} />
          </CardContent>
        </Card>

        {/* Pie Chart - Request Status */}
        <Card>
          <CardHeader>
            <CardTitle>Request Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <PieChart data={pieChartData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
