import { useEffect, useState } from "react";
import { useTaskContext } from "../../context/task-context";
import Task from "../task";
import ConfirmationDialog from "../confirmation-dialog";
import s from "./task-container.module.scss";

const TaskContainer = () => {
  const [isMounted, setMounted] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    show: boolean;
    id: number | undefined;
  }>({ show: false, id: undefined });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoading, tasks, updateTask, deleteTask } = useTaskContext();

  function handleDelete(id?: number) {
    if (!id) return;
    setDeleteModal({ ...deleteModal, id: id });
  }

  function handleClose(id: string | undefined) {
    setDeleteModal({ show: false, id: undefined });
    if (id) deleteTask(Number.parseInt(id));
  }

  useEffect(() => {
    if (!deleteModal.id) return;
    setDeleteModal({ ...deleteModal, show: true });
  }, [deleteModal.id]);

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
            <Task key={`${task.id}-${i}`} task={task} onDelete={handleDelete} />
          );
        })
      )}
      <ConfirmationDialog
        open={deleteModal.show}
        onClose={handleClose}
        value={deleteModal.id?.toString() ?? ""}
      >
        <p>Are you sure you want to delete this task?</p>
      </ConfirmationDialog>
    </div>
  );
};

export default TaskContainer;
