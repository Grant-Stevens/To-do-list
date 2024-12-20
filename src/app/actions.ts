"use server";
import { auth, signIn, signOut } from "@/auth";
import { ITask } from "./context/task-context";
import { IUser } from "./context/user-context";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "PRODUCTION!";

export async function authorise() {
  return await auth();
}

export async function authSignIn(provider: string) {
  return await signIn(provider);
}

export async function authSignOut() {
  return await signOut();
}

export async function updateTask(task: ITask) {
  try {
    const res = await fetch(`${BASE_URL}/api/tasks/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        task: task,
      }),
    });
    if (res.ok) return await res.json();
    throw new Error(res.statusText);
  } catch (error) {
    console.error("ERROR:", error);
  }
}

export async function deleteTask(id: number) {
  try {
    const res = await fetch(`${BASE_URL}/api/tasks/${id}`, {
      method: "DELETE",
    });
    if (res.ok) return await res.json();
    throw new Error(res.statusText);
  } catch (error) {
    console.error("ERROR:", error);
  }
}

export async function addTask(t?: ITask, u?: IUser) {
  if (!t && !u) return;
  if (!t && u) {
    t = {
      title: "Some title",
      content: "Some task content",
      userId: Number.parseInt(u?.id),
    };
  }
  try {
    const res = await fetch(`${BASE_URL}/api/tasks`, {
      method: "POST",
      body: JSON.stringify({ task: t }),
    });
    if (res.ok) return await res.json();
    throw new Error(res.statusText);
  } catch (error) {
    console.error("ERROR:", error);
  }
}
