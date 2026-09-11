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

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (Number(item.price) || 0),
    0,
  );
  const totalFormatted = subtotal.toFixed(2);

  if (loading) return <p>Cargando tu carrito...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mi Carrito ({cartItems.length})</h1>

      <div className={styles.content}>
        <div className={styles.itemList}>
          {cartItems.map((movie) => {
            const movieId = movie.id;
            return (
              <div key={movieId} className={styles.itemCard}>
                <img
                  src={movie.movie_image || "/placeholder.png"}
                  className={styles.poster}
                  alt={movie.title}
                />
                <div className={styles.info}>
                  <h3 className={styles.movieTitle}>{movie.title}</h3>
                  <p className={styles.price}>{movie.price} €</p>
                </div>
                <button
                  className={styles.deleteBtn}
                  onClick={() => dispatch(removeFromCartApi(movie))}
                >
                  Eliminar
                </button>
              </div>
            );
          })}
        </div>

        <div className={styles.summaryCard}>
          <h2>Resumen del pedido</h2>
          <div className={styles.summaryRow}>
            <span>Productos ({cartItems.length})</span>
            <span>{totalFormatted} €</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Gastos de envío</span>
            <span style={{ color: "#10b981" }}>Gratis</span>
          </div>
          <hr className={styles.divider} />
          <div className={`${styles.summaryRow} ${styles.totalRow}`}>
            <span>Total</span>
            <span>{totalFormatted} €</span>
          </div>

          <button className={styles.checkoutBtn}>Proceder al Pago</button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
