"use server";

// import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const RentalCreateRequest = async (data: FieldValues) => {
  // const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/request`, {
      method: "POST",
      headers: {
              "Content-Type": "application/json",
              // Authorization: token,
            },
      body:JSON.stringify(data),
    });
    revalidateTag("RENTAL");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// get all products
export const getAllRequests = async () => {
  // const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/order`,
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
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

// get my products by tenanat
export const getMyRequest = async (tenantId:string) => {
  console.log(tenantId);
  // const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order/myRequests/${tenantId}`,
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
// get my products by tenanat
export const createMypayment = async (tenantId:string,houseData:any) => {
  //console.log(tenantId);
  // const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order/payment/${tenantId}`,
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
export const getMyOwn = async (landlordId:string) => {
  //console.log(landlordId);
  // const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order/myOwnRequest/${landlordId}`,
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

export const updateRequest = async (id: string, houseData: any) => {

  // const token = await getValidToken();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/order/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Authorization: token,
      },
      body: JSON.stringify(houseData),
    });
    revalidateTag("RENTAL");
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};


export const verify = async (orderId: string) => {
  // const token = await getValidToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/order/verify?order_id=${orderId}`,
      {
        // headers: {
        //   Authorization: token,
        // },
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
