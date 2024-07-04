// importo crypto para los id automaticos
import { randomUUID } from "node:crypto";
// Importo la funcion para el archivo Movies.Json
import { readJSON } from "../readJson.js";
const movies = readJSON("./movies.json");

export class ModelMovies {
  static async getMovie({ genre }) {
    if (genre) {
      return movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() == genre.toLowerCase())
      );
    }
    return movies;
  }

  static async getMovieID({ id }) {
    const filterMovie = movies.filter((movie) => movie.id == id);
    return filterMovie;
  }

  static async createMovie({ result }) {
    // crear la pelicula
    const newMovie = {
      id: randomUUID(),
      ...result,
    };

    movies.push(newMovie);
    return newMovie
  }

  static async updatePartialMovie({ id, result }) {
    const movieIndex = movies.findIndex((movie) => movie.id == id);
    if (movieIndex == -1) {
      return false;
    }

    const movieModifi = {
      ...movies[movieIndex],
      ...result,
    };
    movies[movieIndex] = movieModifi;
    return movieModifi
  }
  static async deleteMovie({ id }) {
    const movieFilter = movies.findIndex((movie) => movie.id === id);
    if (movieFilter == -1) {
     return false
    }
    movies.splice(movieFilter, 1);
    return true
  }
}
