"use client";

import Button from "./components/button";
import Canvas from "./components/canvas";
import Task from "./components/task";
import { useAuthContext } from "./context/authContext";
import { useTaskContext } from "./context/taskContext";
import { useUserContext } from "./context/userContext";
import s from "./page.module.scss";

export default function Home() {
  const { isLoading: isAuthLoading, session } = useAuthContext();
  const { isLoading: isUserLoading, user } = useUserContext();
  const {
    isLoading: isTasksLoading,
    tasks,
    addTask,
    deleteTask,
  } = useTaskContext();

  function handleAddTask() {
    addTask();
  }

  console.log("PAGE DEBUG:", user, tasks);

  if (isAuthLoading || isUserLoading) return <span>Loading...</span>;
  if (!session?.user || !user) return <span>Please sign in</span>;
  return (
    <div className={s.page}>
      <div className={s.sidebar}>
        <Button onClick={handleAddTask}>Add task +</Button>
      </div>
      <main className={s.main}>
        <Canvas>
          {isTasksLoading ? (
            <span>Loading...</span>
          ) : (
            tasks?.map((task) => {
              return <Task key={task.id} task={task} onDelete={deleteTask} />;
            })
          )}
        </Canvas>
      </main>
    </div>
  );
}
