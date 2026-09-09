import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartApi, removeFromCartApi } from "../../store/slices/cartSlice";

function CartPage() {
  const dispatch = useDispatch();
  const { items: cartItems, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartApi());
  }, [dispatch]);

  if (loading) return <p>Cargando tu carrito...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {cartItems.map((movie) => {
        const movieId = movie.id || movie._id;
        return (
          <div key={movieId}>
            <img src={movie.movie_image} alt="" />
            <h3>{movie.title}</h3>
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