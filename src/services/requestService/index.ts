"use server";

// import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const RentalCreateRequest = async (data: FieldValues) => {
  // const token = await getValidToken();
  try {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order/create-order`, {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")?.value || "",
      },
      body: JSON.stringify(data),
    });
    revalidateTag("RENTAL");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const RentalCreatePayment = async (requestId: { requestId: string }) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/create-payment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
        body: JSON.stringify(requestId),
      }
    );
    revalidateTag("RENTAL");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// get landlords requests
export const getLandlordRequests = async () => {
  // const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/landlords/requests`,
      {
        headers: {
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
        cache: "no-store",
        next: {
          tags: ["REQUEST"],
        },
      }
    );
    const data = await res.json();
    return data.data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getAllRequests = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/request/all`,
      {
        cache: "no-store",
        next: {
          tags: ["REQUEST"],
        },
      }
    );
    const data = await res.json();
    return data.data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const updateStatusRequest = async (id: string, status: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/landlords/requests/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );
    const data = await res.json();
    revalidateTag("REQUEST");
    return data.data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get my request by tenant
export const getTenantRequest = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/tenants/requests`,
      {
        headers: {
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
        cache: "no-store",
        next: {
          tags: ["REQUEST"],
        },
      }
    );
    const data = await res.json();
    //console.log(data)
    return data.data;
  } catch (error: any) {
    return Error(error.message);
  }
};
// get my products by tenanat
export const createMypayment = async (tenantId: string, houseData: any) => {
  //console.log(tenantId);
  // const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/order/payment/${tenantId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // Authorization: token,
        },
        body: JSON.stringify(houseData),
      }
    );
    const data = await res.json();
    //console.log(data)
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get landlord request by landlord
export const getMyOwn = async (landlordId: string) => {
  //console.log(landlordId);
  // const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/order/myOwnRequest/${landlordId}`,
      {
        // headers: {
        //   Authorization:token,
        // },
        next: {
          tags: ["RENTAL"],
        },
      }
    );
    const data = await res.json();
    //console.log(data)
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get single product
// export const getSingleHouse = async (id: string) => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API}/house/${id}`,
//       {
//         next: {
//           tags: ["RENTAL"],
//         },
//       }
//     );
//     const data = await res.json();
//     return data;
//   } catch (error: any) {
//     return Error(error.message);
//   }
// };

//update request by landlord

export const verify = async (orderId: string) => {
  // const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/verify?order_id=${orderId}`,
      {
        headers: {
          Authorization: (await cookies()).get("accessToken")?.value || "",
        },
        next: {
          tags: ["RENTAL"],
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
