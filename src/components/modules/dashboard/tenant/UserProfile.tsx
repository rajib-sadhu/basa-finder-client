"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { Edit, Save, X, Lock } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { IUser } from "@/types";
import { updatePassword, updateProfile } from "@/services/UserInfo";

const UserProfile = ({ userData }: { userData: IUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phoneNumber: userData.phoneNumber || "",
      });
    }
  }, [userData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const toastId = toast.loading("Updating...");

    try {
      await updateProfile(userData?._id as string, formData);
      toast.success("Profile updated successfully", { id: toastId });
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile", { id: toastId });
      console.error("Update error:", error);
    }
  };

  const handlePasswordUpdate = async () => {
    const toastId = toast.loading("Password updating...");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Please confirm the new password.", { id: toastId });
      return;
    }

    try {
      const res = await updatePassword(userData?._id as string, passwordData);

      console.log("Updated password", res);

      toast.success("Password updated successfully", { id: toastId });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordForm(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      toast.error("Failed to update password. Check your current password.", {
        id: toastId,
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      name: userData?.name || "",
      email: userData?.email || "",
      phoneNumber: userData?.phoneNumber || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <CardTitle className="text-2xl font-bold">
          {userData?.role &&
            userData?.role.charAt(0).toUpperCase() +
              userData?.role.slice(1).toLowerCase()}{" "}
          Profile
        </CardTitle>

        {isEditing ? (
          <div className="flex gap-2">
            <Button onClick={handleCancel} className="gap-2 bg-red-600">
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSave} className="gap-2 bg-blue-700">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setIsEditing(true)}
            className="gap-2 bg-emerald-600"
          >
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <h4 className="text-lg font-semibold">User Information</h4>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {userData?.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {userData?.email}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone</Label>
                {isEditing ? (
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {userData?.phoneNumber}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Account Status</Label>
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      userData?.isActive ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <p className="text-sm text-muted-foreground">
                    {userData?.isActive ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        {/* Password Update Section */}
        <CardFooter className="flex flex-col gap-4 pt-6 border-t">
          {!showPasswordForm ? (
            <Button
              onClick={() => setShowPasswordForm(true)}
              className="gap-2 bg-emerald-600"
            >
              <Lock className="h-4 w-4" />
              Change Password
            </Button>
          ) : (
            <div className="w-full space-y-4">
              <h4 className="font-medium">Update Password</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setShowPasswordForm(false)}>
                  Cancel
                </Button>
                <Button onClick={handlePasswordUpdate}>Update Password</Button>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserProfile;
