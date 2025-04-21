export const getSingleUser = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/users/${id}`,
        {
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