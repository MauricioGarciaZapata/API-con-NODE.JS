// importo la funcion para validar los datos
import {
  respMovieValidation,
  respPartialValidMovie,
} from "../shemes/shemes.js";


export class ModelMoviesController {
  constructor({movieModel}){
    this.movieModel = movieModel
  }
  getMovie = async (req, res) => {
    // en caso de que se haga la petición por la url
    const { genre } = req.query;
    const movies = await this.movieModel.getMovie({ genre });
    return res.json(movies);
  };

  getMovieID = async (req, res) => {
    const { id } = req.params;
    const movie = await this.movieModel.getMovieID({ id });
    if (movie) return res.json(movie);
    res.status(404).json({ message: "Movie not found" });
  };

  createMovie = async (req, res) => {
    const result = respMovieValidation(req.body);
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const newMovie = await this.movieModel.createMovie({ result: result.data });
    return res.status(201).json({ message: newMovie });
  };

  updatePartialMovie = async (req, res) => {
    const result = respPartialValidMovie(req.body);
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const { id } = req.params;

    const movieModifi = await this.movieModel.updatePartialMovie({
      id,
      result: result.data,
    });
    if (!movieModifi){
      return res.status(404).json({ message: "404 not found" });
    }
      
    return res.json(movieModifi);
  };

  deleteMovie = async (req, res) => {
    const { id } = req.params;
    const movieRemove = await this.movieModel.deleteMovie({ id });
    if (!movieRemove){
      return res.status(404).json({ message: "404 movie not found" });
    }
    return res.json(movieRemove);
  };
}
