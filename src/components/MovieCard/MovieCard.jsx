import styles from "./MovieCard.module.css";
function MovieCard({ movie }) {
  if (!movie) return null;
  return (
    <article className={styles.card}>
      <img src={movie.movie_image} alt="" />
      <h2>
        <span>{movie.title}</span>
      </h2>
      <h3> Director: {movie.director}</h3>
      <h3>Año : {movie.year}</h3>
      <p>Rating: {movie.rating}</p>
      <p> Precio: {movie.price}</p>
    </article>
  );
}

export default MovieCard;
