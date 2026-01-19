import { api } from "../../lib/api";

export async function getNowPlaying() {
  const response = await api.get("/movie/now_playing");

  return response.data;
}
