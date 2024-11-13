"use client";

import { useAuthContext } from "./context/authContext";
import styles from "./page.module.css";

export default function Home() {
  const { isLoading, session } = useAuthContext();

  if (isLoading) return <span>Loading...</span>;
  if (!session) return <span>Please sign in</span>;
  return (
    <div className={styles.page}>
      <main className={styles.main}>Home page</main>
    </div>
  );
}
