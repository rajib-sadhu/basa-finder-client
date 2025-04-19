"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/services/AuthService";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { loginSchema } from "./loginValidation";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

// import { FcGoogle } from "react-icons/fc";

import Logo from "@/assets/svg/Logo";
import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";

const LoginForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      console.log(res)
      if (res?.status) {
        toast.success(res?.message);
        router.push("/");
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="w-full px-4">
      <div className="w-full max-w-md mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-sm border">
        <div className=" flex justify-center mb-4">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-xl font-semibold">
              Basa<span className="text-slate-600">Finder</span>
            </span>
          </div>
        </div>

        <h1 className="text-center font-bold text-2xl md:text-3xl pb-6">
          Sign in your account
        </h1>

        {/* <Button

        <Button
          onClick={() =>
            signIn("google", {
              callbackUrl: "http://localhost:3000/about",
            })
          }

          variant={"outline"}
          className="rounded-full w-full gap-2 bg-emerald-100"
        >
          <FcGoogle className="text-lg" />
          Sign in with Google
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">OR</span>
          </div>
        </div> */}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full rounded-full cursor-pointer bg-emerald-700 hover:bg-emerald-900"
              variant="default"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>

        <p className="text-sm text-center mt-6 text-gray-600">
          {"Don't"} have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
