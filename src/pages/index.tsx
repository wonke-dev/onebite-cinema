import SearchableLayout from "@/components/searchable-layout";
import { ReactNode } from "react";
import MovieItem from "@/components/movie-item";
import style from "./index.module.css";
import fetchMovies from "@/lib/fetch-movies";
import fetchRandomMovies from "@/lib/fetch-random-movies";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";

export const getStaticProps = async () => {
  const [allMovies, recoMovies] = await Promise.all([
    fetchMovies(),
    fetchRandomMovies(),
  ]);

  return {
    props: {
      allMovies,
      recoMovies,
    },
    revalidate: 3,
  };
};

export default function Home({
  allMovies,
  recoMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입 시네마</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입 시네마" />
        <meta
          property="og:description"
          content="한입 시네마에 등록된 영화들을 만나보세요"
        />
      </Head>
      <div className={style.container}>
        <section className={style.recommend_section}>
          <h2>지금 가장 추천하는 영화</h2>
          <div className={style.poster_img_wrap}>
            {recoMovies.map((movie) => (
              <MovieItem key={movie.id} {...movie} />
            ))}
          </div>
        </section>
        <section className={style.all_movie_section}>
          <h2>등록된 모든 영화</h2>
          <div className={style.poster_img_wrap}>
            {allMovies.map((movie) => (
              <MovieItem key={movie.id} {...movie} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
