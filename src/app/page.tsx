"use client";

import { useEffect, useState } from "react";
import Button from "./components/button";
import TaskContainer from "./components/task-container";
import { useAuthContext } from "./context/auth-context";
import { useTaskContext } from "./context/task-context";
import { useUserContext } from "./context/user-context";
import s from "./page.module.scss";

export default function Home() {
  const [isMounted, setMounted] = useState(false);
  const { isLoading: isAuthLoading, session } = useAuthContext();
  const { isLoading: isUserLoading, user } = useUserContext();
  const { addTask } = useTaskContext();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) return null;
  if (isAuthLoading || isUserLoading) return <span>Loading...</span>;
  if (!session?.user || !user) return <span>Please sign in</span>;
  // console.log("PAGE DEBUG:", user, tasks);
  return (
    <div className={s.page}>
      <div className={s.sidebar}>
        <Button onClick={() => addTask()}>Add task +</Button>
      </div>
      <main className={s.main}>
        <TaskContainer />
      </main>
    </div>
  );
}
