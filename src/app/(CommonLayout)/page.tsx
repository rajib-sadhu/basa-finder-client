import { getCurrentUser } from "@/services/AuthService";

const HomePage = async () => {
  const user = await getCurrentUser();
  console.log(user);
  return (
    <div className="px-2">
      <h1>Welcome To Home Page</h1>
    </div>
  );
};

export default HomePage;
