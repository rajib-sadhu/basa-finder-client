"use client";

import Image from "next/image";
import newsletter from "../../../assets/images/newsletter.jpg";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

const Newsletter = () => {
  const form = useForm({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { email } = data;

    const templateParams = {
      email,
    };

    emailjs
      .send(
        "service_xis0olu",
        "template_z0t9kic",
        templateParams,
        "xzkJel2g_YNuPO-Js"
      )
      .then(
        () => {
          toast.success("Message sent successfully!");
          form.reset();
        },
        (error) => {
          console.log(error);
          toast.error("Failed to send message. Try again later.");
        }
      );
  };

  return (
    <section className="relative h-[400px] sm:h-[450px] w-full overflow-hidden">
      <Image
        src={newsletter}
        alt="Newsletter Background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/30 z-10" />
      <div className="relative z-20 flex flex-col items-center justify-center h-full container text-white text-center px-4 space-y-6">
        <h2 className="text-3xl font-bold">
          Subscribe to our <span className="text-emerald-700">Newsletter</span>
        </h2>
        <p className="max-w-2xl mx-auto">
          Get exclusive rental offers, blogs & updates straight to your inbox.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xl"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      className="text-black bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className=" bg-emerald-600 hover:bg-emerald-700 sm:w-auto"
            >
              Subscribe
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Newsletter;
