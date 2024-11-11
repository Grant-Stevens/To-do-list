import { signOut } from "@/auth";

const SignOut = () => {
  async function handleSubmit(formData: FormData) {
    "use server";
    // event.preventDefault();
    console.log("DEBUG:", formData.values);

    await signOut();
  }

  return (
    <form action={handleSubmit}>
      <button type="submit" value={"github"}>
        Signout
      </button>
    </form>
  );
};

export default SignOut;
