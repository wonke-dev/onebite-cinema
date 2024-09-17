import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import movies from "@/mock/dummy.json";
import MovieItem from "@/components/movie-item";
import style from "./search.module.css";

export default function Page() {
  return (
    <div className={style.container}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
