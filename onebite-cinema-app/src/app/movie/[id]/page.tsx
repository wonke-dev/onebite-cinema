import { MovieData } from "@/types";
import style from "./page.module.css";
import { notFound } from "next/navigation";
import { ReviewData } from "@/types";
import { ReviewEditor } from "@/components/review-editor";
import ReviewItem from "@/components/review-item";
import Image from "next/image";
import { Metadata } from "next";

async function MovieDetail({ movieId }: { movieId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${movieId}`,
    { next: { tags: [`review-${movieId}`] } }
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
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
    <section>
      <div
        className={style.cover_img}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <Image
          src={posterImgUrl}
          width={240}
          height={300}
          alt={`영화 ${title}의 표지 이미지`}
        />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.info}>
        {releaseDate} / {genres.join(", ")} / {runtime}분
      </div>
      <div className={style.company}>{company}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={description}>{description}</div>
    </section>
  );
}

async function ReviewList({ movieId }: { movieId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/movie/${movieId}`
  );
  if (!response.ok) {
    throw new Error(`Review fetch failed:${response.statusText}`);
  }

  const reviews: ReviewData[] = await response.json();
  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`
  );

  const movies: MovieData[] = await response.json();
  return movies.map(({ id }) => ({ id: id.toString() }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${params.id}`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const movie: MovieData = await response.json();
  return {
    title: `${movie.title} - 한입씨네마`,
    description: `${movie.description}`,
    openGraph: {
      title: `${movie.title} - 한입씨네마`,
      description: `${movie.description}`,
      images: [movie.posterImgUrl],
    },
  };
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className={style.container}>
      <MovieDetail movieId={params.id} />
      <ReviewEditor movieId={params.id} />
      <ReviewList movieId={params.id} />
    </div>
  );
}
