import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartApi, removeFromCartApi } from "../../store/slices/cartSlice";
import styles from "./CartPage.module.css";
function CartPage() {
  const dispatch = useDispatch();
  const {
    items: cartItems,
    loading,
    error,
  } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartApi());
  }, [dispatch]);

  if (loading) return <p>Cargando tu carrito...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      {cartItems.map((movie) => {
        const movieId = movie.id;
        return (
          <div key={movieId} className={styles.itemCart}>
            <img src={movie.movie_image} className={styles.poster} alt="" />
            <h3 className={styles.title}>{movie.movieTitle}</h3>
            <h4 className={styles.price}>{movie.price}$</h4>
            <button onClick={() => dispatch(removeFromCartApi(movieId))}>
              Eliminar
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default CartPage;
