"use server";
import { cookies } from "next/headers";

export const getSingleUser = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/single`,
      {
        headers: {
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
        cache: "no-store",
      }
    );

    const result = await res.json();
    return result.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Error(error);
  }
};
