import LoginForm from "@/components/modules/auth/login/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | BasaFinder",
};

const LoginPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-emerald-100">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
