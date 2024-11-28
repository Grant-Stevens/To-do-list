"use client";

import { useEffect, useState } from "react";
import Button from "../button";
import TaskContainer from "../task-container";
import { useAuthContext } from "../../context/auth-context";
import { useTaskContext } from "../../context/task-context";
import { useUserContext } from "../../context/user-context";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import useWindowDimensions from "../../hooks/useWindowSize";
import s from "./home.module.scss";

function Home() {
  const [isMounted, setMounted] = useState(false);
  const [isSidebarExtended, setSidebarExtended] = useState(true);
  const { isLoading: isAuthLoading, session } = useAuthContext();
  const { isLoading: isUserLoading, user } = useUserContext();
  const { width } = useWindowDimensions();
  const { addTask } = useTaskContext();

  useEffect(() => {
    if (width < 600) {
      setSidebarExtended(false);
    }
  }, [width]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) return null;
  if (isAuthLoading || isUserLoading) return <span>Loading...</span>;
  if (!session?.user || !user) return <span>Please sign in</span>;
  return (
    <div className={s.page}>
      <div
        className={[s.sidebar, isSidebarExtended ? s.extended : null].join(" ")}
      >
        <Button className={s.addBtn} onClick={() => addTask()}>
          {isSidebarExtended && <span>Add task </span>}
          <AddCircleOutlineRoundedIcon />
        </Button>
        <Button
          className={s.toggle}
          mode="primary"
          onClick={() => setSidebarExtended(!isSidebarExtended)}
        >
          {isSidebarExtended ? (
            <ArrowBackIosNewRoundedIcon />
          ) : (
            <ArrowForwardIosRoundedIcon />
          )}
        </Button>
      </div>
      <main className={s.main}>
        <TaskContainer />
      </main>
    </div>
  );
}

export default Home;
