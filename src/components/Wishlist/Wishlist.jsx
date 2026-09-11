import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWishlist,
  removeFromWishlistApi,
} from "../../store/slices/wishlistSlices";
import styles from "./Wishlist.module.css";

function Wishlist() {
  const dispatch = useDispatch();
  const {
    items: wishlistItems,
    loading,
    error,
  } = useSelector((state) => state.wishlist);

  // Carga las películas directamente desde el backend MongoDB
  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  if (loading)
    return <p className={styles.emptyText}>Cargando lista de deseos...</p>;
  if (error) return <p className={styles.emptyText}>{error}</p>;

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <p className={styles.emptyText}>
          No tienes películas en tu lista de deseos
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>
        Mi lista de deseos ({wishlistItems.length})
      </h2>
      <div className={styles.grid}>
        {wishlistItems.map((movie) => (
          <div key={movie.id || movie._id} className={styles.card}>
            <Link to={`/movies/${movie.id || movie._id}`}>
              <img
                src={movie.movie_image || "/placeholder.png"}
                alt={movie.title}
                className={styles.cardImage}
              />
            </Link>
            <h3 className={styles.cardTitle}>{movie.title}</h3>
            <button
              className={styles.removeBtn}
              onClick={() => dispatch(removeFromWishlistApi(movie))}
            >
              Quitar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
