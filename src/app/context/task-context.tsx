"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { DateTime } from "next-auth/providers/kakao";
import { IUser, useUserContext } from "./user-context";
import {
  addTask as addTaskDb,
  updateTask as updateTaskDb,
  deleteTask as deleteTaskDb,
} from "../actions";

export interface ITask {
  id?: number;
  user?: IUser;
  date?: DateTime;
  title: string;
  content: string;
  complete?: boolean;
  userId?: number;
}

interface ITaskContext {
  isLoading: boolean;
  tasks: ITask[] | undefined;
  addTask: (task?: ITask) => void;
  updateTask: (task: ITask) => void;
  deleteTask: (id?: number) => void;
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
  const { user } = useUserContext();
  const [tasks, setTasks] = useState<ITask[] | undefined>();
  const [isLoading, setLoading] = useState<boolean>(true);

  const addTask = useCallback(
    async (t?: ITask) => {
      if (!user) return;
      if (!t)
        t = {
          title: "Some title",
          content: "Some task content",
          userId: Number.parseInt(user.id),
        };
      await addTaskDb(t);
      getTasks(user);
    },
    [user]
  );

  const updateTask = useCallback(
    async (t: ITask) => {
      if (!tasks || !user) return;
      await updateTaskDb(t);
      getTasks(user);
    },
    [user, tasks]
  );

  const deleteTask = useCallback(
    async (id?: number) => {
      if (!tasks || !user || !id) return;
      await deleteTaskDb(id);
      getTasks(user);
    },
    [user, tasks]
  );

  const getTasks = useCallback(async (u: IUser) => {
    setLoading(true);
    const res = await fetch(`/api/tasks`, {
      method: "GET",
    });
    if (!res.ok) {
      setLoading(false);
      return;
    }
    const data = await res.json();
    if (data.tasks)
      setTasks(data.tasks.filter((t: ITask) => t.userId?.toString() == u.id));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!user) return;
    getTasks(user);
  }, [user]);

  const value = { isLoading, tasks, addTask, updateTask, deleteTask };

  return <taskContext.Provider value={value}>{children}</taskContext.Provider>;
};

export default taskContext;
