"use client";

import { Session } from "next-auth";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { authorise, authSignIn, authSignOut } from "../actions";

interface IAuthContext {
  isLoading: boolean;
  session: Session | null;
  signIn: (provider: string) => void;
  signOut: () => void;
  databaseUser: any;
}

const authContext = createContext<IAuthContext | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(authContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ ...props }) => {
  const { children } = props;
  const [session, setSession] = useState<Session | null>(null);
  const [databaseUser, setDatabaseUser] = useState();
  const [isLoading, setLoading] = useState<boolean>(true);

  const signIn = useCallback(async (provider: string) => {
    await authSignIn(provider);
  }, []);

  const signOut = useCallback(async () => {
    setSession(null);
    await authSignOut();
  }, []);

  const getSession = useCallback(async () => {
    setLoading(true);
    if (session) return;
    let result;
    try {
      result = await authorise();
      setSession(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  }, [session]);

  useEffect(() => {
    getSession();
  }, []);

  useEffect(() => {
    async function getDatabaseUser() {
      const res = await fetch(`/api/users/${session?.user?.email}`, {
        method: "GET",
      });
      const data = await res.json();
      // console.log("DEBUG:", data);
      setDatabaseUser(data.user);
    }

    if (!session?.user) return;
    getDatabaseUser();
  }, [session]);

  useEffect(() => {
    async function createUser() {
      const user = await fetch(`/api/users`, {
        method: "POST",
        body: JSON.stringify({
          user: {
            name: session?.user?.name,
            email: session?.user?.email,
          },
        }),
      });
      const data = await user.json();
      console.log("DEBUG:", data);
      setDatabaseUser(data.user);
    }

    // console.log("DEBUG:", databaseUser, session?.user);
    if (databaseUser) return;
    if (!session?.user) return;
    createUser();
  }, [databaseUser]);

  const value = { isLoading, session, signIn, signOut, databaseUser };

  console.log("session:", session, databaseUser);

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default authContext;
