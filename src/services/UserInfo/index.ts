"use server";

import { IUser } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllUsers = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users`, {
      next: {
        tags: ["USERS"],
      },
    });

    const result = await res.json();
    return result.data;
  } catch (error: any) {
    return Error(error);
  }
};
export const getSingleUser = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/single`,
      {
        headers: {
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
        cache: "no-store",
        next: {
          tags: ["USER"],
        },
      }
    );

    const result = await res.json();
    return result.data;
  } catch (error: any) {
    return Error(error);
  }
};
export const updateUserActiveStatus = async (userId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/activation/${userId}`,
      {
        method: "PATCH",
      }
    );

    const result = await res.json();
    revalidateTag("USERS");
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserRole = async (userId: string, role: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/change-role/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      revalidateTag("USERS");
      throw new Error(
        `Failed to update user role: ${error.message || "Unknown error"}`
      );
    }

    const result = await res.json();
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (
  id: string,
  formData: Pick<IUser, "name" | "email" | "phoneNumber">
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(
        `Failed to update user role: ${error.message || "Unknown error"}`
      );
    }

    const result = await res.json();
    revalidateTag("USER");
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const updatePassword = async (
  id: string,
  formData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/update-password/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(
        `Failed to update user password: ${error.message || "Unknown error"}`
      );
    }

    const result = await res.json();
    revalidateTag("USER");
    return result.data;
  } catch (error) {
    throw error;
  }
};
