"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
// import { RentalCreateRequest } from "@/services/OrderService";
import { RentalCreateRequest } from "@/services/requestService";
import { getSingleRental } from "@/services/RentalsService";
import { IUser } from "@/types";
import { getSingleUser } from "@/services/UserInfo";
import { Loader } from "lucide-react";
import Link from "next/link";

const RentalRequest = () => {
  const { id } = useParams();
  const { user } = useUser();
  const router = useRouter();
  const [agree, setAgree] = useState(false);
  const [userInfo, setUserInfo] = useState<IUser>();
  const [loading, setLoading] = useState(true);
  const [landlord, setLandlord] = useState<IUser>();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
  });
  useEffect(() => {
    if (user) {
      const fetchUserInfo = async () => {
        try {
          setLoading(true);
          const res = await getSingleUser();
          setUserInfo(res);
        } catch (err) {
          console.error("Error fetching UserInfo:", err);
        }
      };
      fetchUserInfo();
    }
  }, [user, form]);
  form.setValue("email", user?.email || "");
  form.setValue("name", userInfo?.name || "User Name");
  form.setValue("phoneNumber", userInfo?.phoneNumber || "Phone number");

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        setLoading(true);
        const rental = await getSingleRental(id as string);
        setLandlord(rental?.landlordId);
      } catch (err) {
        console.error("Error fetching rentals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, [id]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!landlord) {
      toast.error("Landlord ID is not available.");
      return;
    }
    try {
      const rentalRequest = {
        listingId: id,
        message: data.message,
      };

      console.log({ rentalRequest });

      const res = await RentalCreateRequest(rentalRequest);
      console.log(res);
      if (res.status) {
        toast.success("Request created successfully!");
        router.push("/tenant/myRequests");
      }
    } catch (error) {
      console.error("Error during rental request:", error);
      toast.error("Failed to request rental");
    }
  };

  if (loading) {
    return (
      <div className="grid h-40 place-content-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Request a Rental House</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} required readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PhoneNumber</FormLabel>
                <FormControl>
                  <Input type="number" {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter your message..."
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-2">
            <Checkbox
              checked={agree}
              onCheckedChange={(checked) => setAgree(checked === true)}
            />
            <label>
              I agree to the{" "}
              <Link href="/terms" className="underline text-blue-900">
                terms and conditions
              </Link>
            </label>
          </div>

          <Button
            disabled={!agree}
            className="bg-emerald-600 hover:bg-emerald-800 text-white"
            type="submit"
          >
            Submit Request
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RentalRequest;
