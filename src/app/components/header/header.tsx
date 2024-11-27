import Profile from "../profile/profile";
import Image from "next/image";
import s from "./header.module.scss";

const Header = async () => {
  return (
    <div className={s.header}>
      {/* <Image src={"/logo.png"} alt={"logo"} height={30} width={30} /> */}
      <h2 className={s.title}>To-do list</h2>
      <Profile />
    </div>
  );
};

export default Header;
