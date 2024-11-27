import { useAuthContext } from "../context/auth-context";
import Button from "./button";

const SignOut = () => {
  const { signOut } = useAuthContext();

  return (
    <Button mode={"secondary"} onClick={signOut}>
      Signout
    </Button>
  );
};

export default SignOut;
