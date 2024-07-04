import mysql from "mysql2/promise.js";

const config = {
  host: "localhost",
  user: "root",
  port: 3306,
  password: "Alcohol2000*.",
  database: "moviesDB",
};

const connection = await mysql.createConnection(config);

export class ModelMovies {
  static async getMovie() {
    try {
      const result = await connection.query(
        "SELECT *, title,year,director,duration,poster,rate,BIN_TO_UUID(id) FROM movie"
      );
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  static async getMovieID({ id }) {
    try{
      const [movies] = await connection.query(
        "SELECT title,year,director,duration,poster,rate,BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);",
        [id]
      );
      if (movies.length == 0) return null;
  
      return movies[0];
    }catch(error){
      // manejo básico de errores
      console.log(error)
    }
  }

  static async createMovie({ result }) {
    try{
      const {
        title,
        year,
        director,
        duration,
        poster,
        rate,
        genre: genreInput,
      } = result;
  
      const [uuidSql] = await connection.query("SELECT UUID() uuid");
      const [{ uuid }] = uuidSql;
  
      const [create] = await connection.query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES (UUID_TO_BIN("${uuid}"),?,?,?,?,?,?);`,
        [title, year, director, duration, poster, rate]
      );
  
      const [CreatedMovie] = await connection.query(
        `SELECT title, year,director,poster,rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?)`,
        [uuid]
      );
  
      return CreatedMovie;
    }catch(error){
      console.log(error)
    }
  }

  static async updatePartialMovie({ id, result }) {
   try{
    const [registerUpdate] = await connection.query(
      `UPDATE movie set ? WHERE id=UUID_TO_BIN(?)`,
      [result, id]
    );
    if (registerUpdate.affectedRows == 0) {
      return null;
    }
    // se hace la consulta para ver el registro editado
    const [movies] = await connection.query(
      "SELECT title,year,director,duration,poster,rate,BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);",
      [id]
    );
    return movies;
   }catch(error){
    console.log(error)
   }
  }

  static async deleteMovie({ id }) {
    try {
      const [movieDelete] = await connection.query(
        `DELETE FROM movie WHERE id = UUID_TO_BIN(?)`,
        [id]
      );
      console.log(`Devuelve ${movieDelete.affectedRows}`);
      if (movieDelete.affectedRows === 0) {
        return null;
      }

      return { message: "removed movie" };
    } catch (error) {
      console.error("Error deleting movie", error);
    }
  }
}
