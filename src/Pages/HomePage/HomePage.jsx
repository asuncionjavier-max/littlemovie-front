    import { Link } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
    import useFilterMovie from "../../Hooks/useFilterMovies";
    import styles from "./HomePage.module.css";

    function HomePage() {
        const { data: movies, loading, error } = useFetch("/movies");

        const genres = [ "todos", "Drama", "Accion", "Sci-Fi", "Terror", "Comedia",  ]
        return (
        <div className={styles.container}>
        <section className={styles.heroSection}>
            <h1>Bienvenido a LittleMovie</h1>
            <p>Disfruta de nuestro catálogo de películas</p>
        </section>

        <section className={styles.catalogSection}>
            <h2>Películas aclamadas por la critica</h2>
            {loading && <p>Cargando películas...</p>}
            {error && <p className={styles.error}>{error}</p>}
            
            {/* El div que envuelve el map es el que debe tener el Grid */}
            <div className={styles.moviesGrid}>
            {movies?.slice().sort((a, b) => b.rating - a.rating).slice(0, 7).map((movie) => ( 
                <div key={movie.id || movie} className={styles.movieCard}>
            <Link to={`/movies/${movie.id}`}>
                <img 
                    className={styles.cardImage} 
                    src={movie.movie_image || "/placeholder.png"} 
                    alt={movie.title} 
                /> </Link>
                <h3 className={styles.cardTitle}>{movie.title}</h3>
                <p className={styles.cardPrice}>{movie.price}$</p>
                <button className={styles.buyButton}>Comprar</button>
                </div>
            ))}
            </div>
        </section>
        </div>
        );
    }

    export default HomePage;