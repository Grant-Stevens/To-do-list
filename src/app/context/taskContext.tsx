"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { DateTime } from "next-auth/providers/kakao";
import { IUser, useUserContext } from "./userContext";

export interface ITask {
  id: number;
  user: IUser;
  date: DateTime;
  title: string;
  content: string;
  complete: boolean;
  userId: number;
}

interface ITaskContext {
  isLoading: boolean;
  tasks: ITask[] | undefined;
  addTask: (task?: ITask) => void;
  updateTask: (task: ITask) => void;
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
  const { user } = useUserContext();
  const [tasks, setTasks] = useState<ITask[] | undefined>();
  const [isLoading, setLoading] = useState<boolean>(false);

  const addTask = useCallback(
    async (t?: ITask) => {
      if (!user) return;
      const newTask = {
        title: "",
        content: "",
        userId: user?.id,
      };
      const res = await fetch(`/api/tasks`, {
        method: "POST",
        body: JSON.stringify({ task: t ?? newTask }),
      });
      if (!res.ok) {
        setLoading(false);
        return;
      }
      getTasks(user);
    },
    [tasks]
  );

  const updateTask = useCallback(
    async (t: ITask) => {
      if (!user) return;
      const res = await fetch(`/api/tasks/${t.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          task: t,
        }),
      });
      if (!res.ok) {
        setLoading(false);
        return;
      }
      getTasks(user);
    },
    [tasks]
  );

  const deleteTask = useCallback(
    async (id: number) => {
      if (!user) return;
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        setLoading(false);
        return;
      }
      getTasks(user);
    },
    [tasks]
  );

  const getTasks = useCallback(
    async (u: IUser) => {
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
        setTasks(data.tasks.filter((t: ITask) => t.userId.toString() == u.id));
      setLoading(false);
    },
    [user, addTask, updateTask, deleteTask]
  );

  useEffect(() => {
    if (!user) return;
    getTasks(user);
  }, [user]);

  const value = { isLoading, tasks, addTask, updateTask, deleteTask };

  // console.log("tasks:", tasks);

  return <taskContext.Provider value={value}>{children}</taskContext.Provider>;
};

export default taskContext;
