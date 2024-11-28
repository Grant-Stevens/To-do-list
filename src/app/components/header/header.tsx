import Profile from "../profile/profile";
import s from "./header.module.scss";

const Header = async () => {
  return (
    <div className={s.header}>
      <h2 className={s.title}>To-do list</h2>
      <Profile />
    </div>
  );
};

export default Header;
