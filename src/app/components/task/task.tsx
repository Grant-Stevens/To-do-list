import { ITask } from "../../context/taskContext";
import Button from "../button";
import s from "./task.module.scss";

const Task = ({
  task,
  onDelete,
}: {
  task: ITask;
  onDelete: (id: number) => void;
}) => {
  return (
    <div className={s.task}>
      <Button mode="tertiary" onClick={() => onDelete(task.id)}>
        X
      </Button>
      <span>
        {task.id}: {task.title}
      </span>
      <p>{task.content}</p>
    </div>
  );
};

export default Task;
