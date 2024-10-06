import style from "./movie-item-skeleton.module.css";

export default function MovieItemSkeleton({ col }: { col: number }) {
  return <div className={`${style.cover_img} ${style[`col-${col}`]}`}></div>;
}
