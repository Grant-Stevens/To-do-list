"use client";

import Button from "./components/button";
import Canvas from "./components/canvas";
import { useAuthContext } from "./context/authContext";
import s from "./page.module.scss";

export default function Home() {
  const { isLoading, databaseUser } = useAuthContext();

  function handleAddTask() {}

  if (isLoading) return <span>Loading...</span>;
  if (!databaseUser) return <span>Please sign in</span>;
  return (
    <div className={s.page}>
      <div className={s.sidebar}>
        <Button onClick={handleAddTask}>Add task +</Button>
      </div>
      <main className={s.main}>
        <Canvas>
          {databaseUser.tasks?.map((task) => {
            return <div key={task.id}>{task.title}</div>;
          })}
        </Canvas>
      </main>
    </div>
  );
}
