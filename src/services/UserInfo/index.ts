"use server";

export const getAllUsers = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users`, {
      cache: "no-store",
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
export const getSingleUser = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${id}`, {
      cache: "no-store",
      next: {
        tags: ["USER"],
      },
    });

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
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to update user status");
    }

    const result = await res.json();
    return result.data;
  } catch (error) {
    throw error;
  }
};
