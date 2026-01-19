import { useQuery } from "@tanstack/react-query";
import { getNowPlaying } from "./api";

export function useGetNowPlaying() {
  return useQuery({
    queryKey: ["NOW_PLAYING"],
    queryFn: getNowPlaying,
  });
}
