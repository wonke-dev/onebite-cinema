import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";
import style from "./page.module.css";
import MovieItem from "@/components/movie-item";
import { MovieData } from "@/types";
import { Suspense } from "react";
import { Metadata } from "next";

async function SearchResult({ q }: { q: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const movies: MovieData[] = await response.json();

  return (
    <>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </>
  );
}

type Props = { searchParams: { q?: string } };

export function generateMetadata({ searchParams }: Props): Metadata {
  return {
    title: `${searchParams.q} : 한입씨네마 검색`,
    description: `${searchParams.q} 검색 결과입니다.`,
    openGraph: {
      title: `${searchParams.q} : 한입씨네마 검색`,
      description: `${searchParams.q} 검색 결과입니다.`,
      images: ["/thumbnail.png"],
    },
  };
}

export default async function Page({ searchParams }: Props) {
  return (
    <div className={style.container}>
      <Suspense
        key={searchParams.q || ""}
        fallback={<MovieListSkeleton count={3} col={3} />}
      >
        <SearchResult q={searchParams.q || ""} />
      </Suspense>
    </div>
  );
}
