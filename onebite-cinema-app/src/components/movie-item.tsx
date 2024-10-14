import type { MovieData } from "@/types";
import Link from "next/link";
import Image from "next/image";

export default function MovieItem({ id, title, posterImgUrl }: MovieData) {
  return (
    <Link href={`/movie/${id}`}>
      <Image
        src={posterImgUrl}
        width={106}
        height={159}
        alt={`영화 ${title}의 포스터 이미지`}
      />
    </Link>
  );
}
