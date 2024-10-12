import { ReviewData } from "@/types";
import style from "./review-item.module.css";
import ReviewItemDeleteButton from "./review-item-delete-btn";

export default function ReviewItem({
  id,
  content,
  author,
  createdAt,
  movieId,
}: ReviewData) {
  return (
    <div className={style.container}>
      <div className={style.info}>
        <div className={style.author}>{author}</div>
        <div className={style.date}>{new Date(createdAt).toLocaleString()}</div>
      </div>
      <div className={style.content}>{content}</div>
      <div className={style.delete_btn}>
        <ReviewItemDeleteButton reviewId={id} movieId={movieId} />
      </div>
    </div>
  );
}
