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
  const [isLoading, setLoading] = useState<boolean>(false);

  const signIn = useCallback(async (provider: string) => {
    setLoading(true);
    await authSignIn(provider);
    setLoading(false);
  }, []);

  const signOut = useCallback(async () => {
    setSession(null);
    await authSignOut();
  }, []);

  const getSession = useCallback(async () => {
    setLoading(true);
    if (session) {
      setLoading(false);
      return;
    }
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

  const value = { isLoading, session, signIn, signOut };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default authContext;
