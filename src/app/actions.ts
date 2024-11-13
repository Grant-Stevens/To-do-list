"use server";
import { auth, signIn, signOut } from "@/auth";

export async function authorise() {
  return await auth();
}

export async function authSignIn(provider: string) {
  return await signIn(provider);
}

export async function authSignOut() {
  return await signOut();
}
