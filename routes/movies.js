import { Router } from "express";
import { ModelMoviesController } from "../controllers/movies.js";

export function createMovieRouter({movieModel}) {
  const moviesRouter = Router();
  // se crea una nueva instancia de Movies Controles y se le inyectan las dependencias
  const movieController = new ModelMoviesController({
    movieModel,
  });

  moviesRouter.get("/", movieController.getMovie);
  moviesRouter.get("/:id", movieController.getMovieID);
  moviesRouter.post("/", movieController.createMovie);
  moviesRouter.patch("/:id", movieController.updatePartialMovie);
  moviesRouter.delete("/:id", movieController.deleteMovie);

  return moviesRouter;
}
