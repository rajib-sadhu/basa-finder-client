import RegisterForm from "@/components/modules/auth/register/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | BasaFinder",
};

const RegisterPage = () => {
  return (
    <div className="py-5 flex justify-center items-center bg-emerald-100">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
