import { useAuthContext } from "../context/authContext";
import Button from "./button";

const SignOut = () => {
  const { signOut } = useAuthContext();

  return (
    <Button type="submit" onClick={signOut}>
      Signout
    </Button>
  );
};

export default SignOut;
