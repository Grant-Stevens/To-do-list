"use client";
import Button from "../button";
import { useAuthContext } from "../../context/auth-context";
import s from "./sign-in.module.scss";

const SignIn = () => {
  const { signIn } = useAuthContext();

  function handleSubmit(provider: string) {
    signIn(provider);
  }

  return (
    <div className={s.modal}>
      <Button onClick={() => handleSubmit("github")}>Signin with github</Button>
      <Button onClick={() => handleSubmit("google")}>Signin with google</Button>
    </div>
  );
};

export default SignIn;
