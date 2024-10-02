import style from "./page.module.css";
import MovieItem from "@/components/movie-item";
import movies from "@/mock/dummy.json";

export default function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return (
    <div className={style.container}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}
