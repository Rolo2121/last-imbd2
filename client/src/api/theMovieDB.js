import axios from "axios";

export async function getMoviesByName(name) {
  const response = await axios.get(`/api/movie/search/${name || "undefined"}`);
  return response.data;
}
