import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import { addToCartApi } from "../../store/slices/cartSlice";
import { addToWishlistApi } from "../../store/slices/wishlistSlices";
import styles from "./MoviePage.module.css";

function MoviePage() {
  const dispatch = useDispatch();

  const { data: moviesData, loading, error } = useFetch("/movies");
  const movies = Array.isArray(moviesData)
    ? moviesData
    : moviesData?.data || [];

  if (loading)
    return <div className={styles.message}>Cargando catálogo... 🎬</div>;
  if (error) return <div className={styles.errorMessage}>{error}</div>;

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Catálogo de Películas</h1>

      <div className={styles.grid}>
        {movies.map((movie) => {
          const movieId = movie.id;

          return (
            <article key={movieId} className={styles.card}>
              <Link to={`/movies/${movieId}`}>
                <img
                  src={movie.movie_image || "/placeholder.png"}
                  alt={movie.title}
                  className={styles.poster}
                />
              </Link>

              <div className={styles.cardContent}>
                <h2 className={styles.movieTitle}>{movie.title}</h2>
                <p className={styles.price}>{movie.price} €</p>

                <div className={styles.actions}>
                  <button
                    className={styles.cartBtn}
                    onClick={() => {
                      console.log("añadiendo pelicula al carrito:", movie);
                      dispatch(addToCartApi(movie));
                    }}
                  >
                    🛒 Añadir
                  </button>

                  <button
                    className={styles.wishlistBtn}
                    onClick={() => dispatch(addToWishlistApi(movieId))}
                    title="Añadir a la lista de deseos"
                  >
                    ❤️
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}

export default MoviePage;
