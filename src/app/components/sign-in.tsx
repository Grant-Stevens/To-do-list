import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <form>
      <button
        type="submit"
        formAction={async () => {
          "use server";
          await signIn("github");
        }}
      >
        Signin with github
      </button>
      <button
        type="submit"
        formAction={async () => {
          "use server";
          await signIn("google");
        }}
      >
        Signin with google
      </button>
    </form>
  );
}
