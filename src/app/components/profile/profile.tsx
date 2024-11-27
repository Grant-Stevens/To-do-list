/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import SignIn from "../sign-in";
import SignOut from "../sign-out";
import Button from "../button";
import { useAuthContext } from "../../context/auth-context";
import s from "./profile.module.scss";

const Profile = () => {
  const { session } = useAuthContext();
  const [showSignIn, setShowSignIn] = useState(false);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {session?.user ? (
        <div className={s.container}>
          <span>{session?.user?.name}</span>
          <SignOut />
        </div>
      ) : (
        <Button mode={"secondary"} onClick={() => setShowSignIn(true)}>
          Sign in
        </Button>
      )}
      {showSignIn && <SignIn />}
    </>
  );
};

export default Profile;
