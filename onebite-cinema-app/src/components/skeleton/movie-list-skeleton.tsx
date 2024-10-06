import MovieItemSkeleton from "./movie-item-skeleton";

export default function MovieListSkeleton({
  count,
  col,
}: {
  count: number;
  col: number;
}) {
  return new Array(count)
    .fill(0)
    .map((_, idx) => (
      <MovieItemSkeleton key={`movie-item-skeleton${idx}`} col={col} />
    ));
}
