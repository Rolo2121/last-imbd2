import axios from "axios";

export async function getMovieByName(name) {
  const response = await axios.get(`/api/movie/search/${name || "undefined"}`);
  return response.data;
}
