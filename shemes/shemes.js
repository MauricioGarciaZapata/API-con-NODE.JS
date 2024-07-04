//importo zod para la validación de datos
import zod from "zod"

const movieValidation = zod.object({
    title: zod.string({
      required_error:'title is require',
      invalid_type_error:'title must be a string'
    }),
    year: zod.number().int().min(1900).max(2025).positive(),
    director: zod.string(),
    duration: zod.number().positive().int(),
    rate: zod.number().min(0).max(10),
    poster: zod.string().url(),
    genre: zod.array(
      zod.enum([
        "Action",
        "Adventure",
        "Comedy",
        "Drama",
        "Fantasy", // Corrección de "Fanatsy" a "Fantasy"
        "Horror",
        "Thriller",
        "Sci-Fi",
      ],
    {
      invalid_type_error: 'The movie must be a some genre',
      required_error:'the movie must be a some genre'
    })
    ).min(1,"Movie genre must have at least one genre")

  })

export function respMovieValidation(object){
    return movieValidation.safeParse(object)
}
export function respPartialValidMovie(object){
    return movieValidation.partial().safeParse(object)
}

