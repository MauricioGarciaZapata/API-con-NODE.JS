// importar el express
import express, { json } from "express";
//se importa el cors
import { validateCors } from "./middlewares/cors.js";
import { createMovieRouter } from "./routes/movies.js";
import { ModelMovies } from "./models/mySql/movies.js";
// crear la app con el express
const app = express();

// RECUERDA: el middleware es primordial para recibir los datos en json parseados del body
app.use(json());
app.use(validateCors());
// ignorar el powered by
app.disable("X-Powered-By");
// se lleva a las movies router en caso de ser /movies
app.use("/movies", createMovieRouter({movieModel: ModelMovies}))

// crear el puerto
const PORT = process.env.PORT ?? 1234;
//crear el puerto
app.listen(
  PORT,
  console.log(`Server listening on port http://localhost/${PORT}`)
);
