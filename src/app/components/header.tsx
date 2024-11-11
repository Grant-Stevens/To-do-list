import { auth } from "@/auth";
import SignIn from "./sign-in";
import SignOut from "./sign-out";

const Header = async () => {
  const session = await auth();

  console.log("user:", session);
  if (!session?.user) return <SignIn />;
  return <SignOut />;
};

export default Header;
