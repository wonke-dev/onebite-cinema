import MovieItem from "@/components/movie-item";
import style from "./page.module.css";
import { MovieData } from "@/types";

async function AllMovies() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다..</div>;
  }

  const allMovies: MovieData[] = await response.json();

  return (
    <>
      {allMovies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </>
  );
}

async function RecoMovies() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`,
    { next: { revalidate: 3 } }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const recoMovies: MovieData[] = await response.json();
  return (
    <>
      {recoMovies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <section className={style.recommend_section}>
        <h2>지금 가장 추천하는 영화</h2>
        <div className={style.poster_img_wrap}>{<RecoMovies />}</div>
      </section>
      <section className={style.all_movie_section}>
        <h2>등록된 모든 영화</h2>
        <div className={style.poster_img_wrap}>
          <AllMovies />
        </div>
      </section>
    </div>
  );
}
