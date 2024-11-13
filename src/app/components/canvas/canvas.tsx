import s from "./canvas.module.scss";

const Canvas = (props: React.HTMLProps<HTMLCanvasElement>) => {
  return <canvas className={s["canvas"]}>{props.children}</canvas>;
};

export default Canvas;
