import { useEffect, useState } from "react";
import { useTaskContext } from "../../context/task-context";
import Task from "../task";
import s from "./task-container.module.scss";

const TaskContainer = () => {
  const [isMounted, setMounted] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoading, tasks, updateTask, deleteTask } = useTaskContext();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <div className={s["container"]}>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        tasks?.map((task, i) => {
          return (
            <Task key={`${task.id}-${i}`} task={task} onDelete={deleteTask} />
          );
        })
      )}
    </div>
  );
};

export default TaskContainer;
