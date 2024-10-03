import style from "./page.module.css";

export default async function Page({
  params,
}: {
  params: { id: string | string[] };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${params.id}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const movie = await response.json();

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
  } = movie;

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
