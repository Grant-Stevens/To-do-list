/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthContext } from "./auth-context";
import { ITask } from "./task-context";
import { User } from "next-auth";

export interface IUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  tasks?: ITask[];
}

interface IUserContext {
  isLoading: boolean;
  user: IUser | undefined;
  addUser: (user: IUser) => void;
  deleteUser: (id: string) => void;
  updateUser: (user: IUser) => void;
}

const userContext = createContext<IUserContext | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(userContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ ...props }) => {
  const { children } = props;
  const { session } = useAuthContext();
  const [user, setUser] = useState<IUser | undefined>();
  const [isLoading, setLoading] = useState<boolean>(false);

  const getUserFromDB = useCallback(
    async (u: IUser | User) => {
      setLoading(true);
      const res = await fetch(`/api/users/${u.email}`, {
        method: "GET",
      });
      if (!res.ok) {
        setLoading(false);
        return;
      }
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
      } else {
        addUser(session?.user);
      }
      setLoading(false);
    },
    [session]
  );

  const addUser = useCallback(async (u: IUser | User | undefined) => {
    setLoading(true);
    const res = await fetch(`/api/users`, {
      method: "POST",
      body: JSON.stringify({
        user: u,
      }),
    });
    if (!res.ok) {
      setLoading(false);
      return;
    }
    const data = await res.json();
    if (data.user) setUser(data.user);
    setLoading(false);
  }, []);

  const deleteUser = useCallback(async (id: string) => {
    console.log("DELETE USER:", id);
  }, []);

  const updateUser = useCallback(async (u: IUser) => {
    setLoading(true);
    const res = await fetch(`/api/users/${u.email}`, {
      method: "PATCH",
      body: JSON.stringify({
        user: u,
      }),
    });
    if (!res.ok) {
      setLoading(false);
      return;
    }
    const data = await res.json();
    if (data.user) setUser(data.user);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!session?.user) return;
    getUserFromDB(session.user);
  }, [session]);

  const value = { isLoading, user, addUser, updateUser, deleteUser };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export default userContext;
