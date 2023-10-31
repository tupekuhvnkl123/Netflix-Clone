import axios from "axios";

//# Auth #\\
export const login = async (data) =>
  (await axios.post("/auth/login", data)).data;

export const register = async (data) =>
  (await axios.post("/auth/register", data)).data;

//# Account #\\
export const deleteAccount = async () =>
  (await axios.delete("/account/deleteAccount")).data;

//# Movies #\\
export const addToList = async (movieId) =>
  (await axios.patch(`/movies/myList/${movieId}`)).data;

export const getMyList = async () => (await axios.get(`/movies/myList`)).data;

export const searchMovie = async (text) =>
  (await axios.get(`/movies/search/${text}`)).data;

export const getMovie = async (movieId) =>
  (await axios.get(`/movies/${movieId}`)).data;

export const getMovieGenres = async (movieId) =>
  (await axios.get(`/movies/${movieId}/genres`)).data;

export const getTrending = async (username) =>
  (await axios.get(`/movies/trending`)).data;

export const getNetflixOriginal = async (data, username) =>
  (await axios.get(`/movies/netflixOriginal`, data)).data;

export const getTopRated = async (username) =>
  (await axios.get(`/movies/trending`)).data;

export const getAction = async (data, username) =>
  (await axios.get(`/movies/action`, data)).data;

export const getHorror = async (data, username) =>
  (await axios.get(`/movies/horror`, data)).data;

export const getComedy = async (data, username) =>
  (await axios.get(`/movies/comedy`, data)).data;

export const getRomance = async (data, username) =>
  (await axios.get(`/movies/romance`, data)).data;

export const getDocumentaries = async (data, username) =>
  (await axios.get(`/movies/documentaries`, data)).data;

//# General err Message #\\
export const errorMessage = (error, customMessage) =>
  error
    ? error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : customMessage
    : null;
