import style from "./page.module.css";
import movies from "@/mock/dummy.json";

export default function Page() {
  const {
    id,
    title,
    subTitle,
    company,
    runtime,
    description,
    posterImgUrl,
    releaseDate,
    genres,
  } = movies[3];

  return (
    <div>
      <div className={style.container}>
        <div
          className={style.cover_img}
          style={{ backgroundImage: `url('${posterImgUrl}')` }}
        >
          <img src={posterImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.info}>
          {releaseDate} / {genres.join(", ")} / {runtime}분
        </div>
        <div className={style.company}>{company}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={description}>{description}</div>
      </div>
    </div>
  );
}
