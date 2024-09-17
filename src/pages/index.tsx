import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import movies from "@/mock/dummy.json";
import MovieItem from "@/components/movie-item";
import style from "./index.module.css";

export default function Home() {
  return (
    <div className={style.container}>
      <section className={style.recommend_section}>
        <h2>지금 가장 추천하는 영화</h2>
        <div className={style.poster_img_wrap}>
          {movies.slice(0, 3).map((movie) => (
            <MovieItem key={`${movie.id}`} {...movie} />
          ))}
        </div>
      </section>
      <section className={style.all_movie_section}>
        <h2>등록된 모든 영화</h2>
        <div className={style.poster_img_wrap}>
          {movies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
