import style from "./review-editor.module.css";
import { createReviewAction } from "@/actions/create-review-action";

export function ReviewEditor({ movieId }: { movieId: string }) {
  return (
    <section className={style.container}>
      <form className={style.form_container} action={createReviewAction}>
        <input name="movieId" value={movieId} hidden readOnly />
        <textarea required name="content" placeholder="리뷰 내용" />
        <div className={style.bottom_container}>
          <input required name="author" placeholder="작성자" />
          <button type="submit">작성하기</button>
        </div>
      </form>
    </section>
  );
}
