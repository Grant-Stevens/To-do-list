import s from "./canvas.module.scss";

const Canvas = (props: React.HTMLProps<HTMLCanvasElement>) => {
  return <div className={s["canvas"]}>{props.children}</div>;
};

export default Canvas;
