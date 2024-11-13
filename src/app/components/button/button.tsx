"use client";
import s from "./button.module.scss";

type TButtonType = "primary" | "secondary" | "tertiary";

interface IButtonProps extends React.HTMLProps<HTMLButtonElement> {
  mode?: TButtonType;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  mode = "primary",
  type = "button",
  ...props
}: IButtonProps) => {
  return (
    <button type={type} className={[s.button, s[mode]].join(" ")} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
