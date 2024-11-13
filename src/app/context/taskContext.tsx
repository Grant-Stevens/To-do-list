"use client";

import prismaScripts from "@/prisma/script";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface IUser {
  name: string;
  email: string;
}

interface ITask {
  id: number;
  owner: IUser;
  date: string;
  title: string;
  content: string;
  complete: boolean;
  ownerId: number;
}

interface ITaskContext {
  isLoading: boolean;
  tasks: ITask[] | undefined;
  addTask: (task: ITask) => void;
  deleteTask: (id: number) => void;
}

const taskContext = createContext<ITaskContext | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(taskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider = ({ ...props }) => {
  const { children } = props;
  const [tasks, setTasks] = useState();
  const [isLoading, setLoading] = useState<boolean>(true);

  const addTask = useCallback(async (task: ITask) => {}, []);

  const deleteTask = useCallback(async (id: number) => {}, []);

  const getTasks = useCallback(async () => {
    setLoading(true);
    // const t = prismaScripts.getTasks();
    // console.log("DEBUG:", t);
    // setTasks(t);
  }, []);

  useEffect(() => {
    getTasks();
  }, []);

  const value = { isLoading, tasks, addTask, deleteTask };

  // console.log("session:", tasks);

  return <taskContext.Provider value={value}>{children}</taskContext.Provider>;
};

export default taskContext;
