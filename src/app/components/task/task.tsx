import { ITask } from "../../context/task-context";
import Button from "../button";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import CheckBoxOutlineBlankRoundedIcon from "@mui/icons-material/CheckBoxOutlineBlankRounded";
import { useActionState, useEffect, useState } from "react";
import s from "./task.module.scss";
import { z } from "zod";
import { updateTask } from "../../actions";

const schema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  complete: z.boolean(),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formCallback = (prevState: any, formData: any) => {
  console.log("formAction:", prevState, formData);
  const validatedFields = schema.safeParse({
    id: Number.parseInt(formData.get("id")),
    title: formData.get("title"),
    content: formData.get("content"),
    complete: !!formData.get("complete"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  } else {
    updateTask({
      id: Number.parseInt(formData.get("id")),
      title: formData.get("title"),
      content: formData.get("content"),
      complete: !!formData.get("complete"),
    });
  }

  console.log("SUBMIT?", validatedFields);
  return {
    task: validatedFields.data,
    errors: {},
  };
};

const Task = ({
  task,
  onDelete,
}: {
  task: ITask;
  onDelete: (id?: number) => void;
}) => {
  const [isMounted, setMounted] = useState(false);
  const [isEditable, setEditable] = useState(false);
  const [complete, setComplete] = useState<boolean>(!!task.complete);
  const initialState = {
    task: task,
    errors: {},
  };
  const [state, formAction] = useActionState(formCallback, initialState);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (
      (e.ctrlKey || e.metaKey) &&
      (e.key === "Enter" || e.key === "NumpadEnter")
    ) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
      toggleEdit();
    }
  }

  function toggleEdit(e?: React.MouseEvent<HTMLButtonElement>) {
    if (e) e.preventDefault();
    if (isEditable) {
      e?.currentTarget.form?.requestSubmit();
    }
    setEditable(!isEditable);
  }

  function toggleComplete() {
    setComplete(!complete);
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  // console.log("State:", state);

  if (!isMounted) return;

  return (
    <form className={s["task"]} action={formAction}>
      <input type="hidden" name="id" value={state.task.id} />
      <div className={s.head}>
        <input
          type="text"
          name="title"
          className={s.input}
          defaultValue={state.task.title}
          readOnly={!isEditable}
          disabled={!isEditable}
        />
      </div>
      <div className={s.body}>
        <textarea
          id={"content"}
          name={"content"}
          className={[s["content-input"], s.input].join(" ")}
          defaultValue={state.task.content}
          onKeyDown={handleKeyDown}
          readOnly={!isEditable}
          disabled={!isEditable}
        />
        <label className={s.label}>
          Completed?
          <input
            className={[s.input, s["complete-input"]].join(" ")}
            type="checkbox"
            id="complete"
            name="complete"
            checked={complete}
            readOnly
            hidden
          />
          {complete ? (
            <CheckBoxRoundedIcon
              onClick={isEditable ? toggleComplete : undefined}
            />
          ) : (
            <CheckBoxOutlineBlankRoundedIcon
              onClick={isEditable ? toggleComplete : undefined}
            />
          )}
        </label>
      </div>
      <div className={s.foot}>
        <>{/* {state?.errors)} */}</>
        {isEditable ? (
          <Button mode="tertiary" onClick={toggleEdit}>
            <SaveIcon />
          </Button>
        ) : (
          <Button mode="tertiary" onClick={toggleEdit}>
            <EditIcon />
          </Button>
        )}
        <Button mode="tertiary" onClick={() => onDelete(state.task.id)}>
          <DeleteRoundedIcon />
        </Button>
      </div>
    </form>
  );
};

export default Task;
