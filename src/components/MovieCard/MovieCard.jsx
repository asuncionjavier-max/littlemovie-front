import styles from "./MovieCard.module.css"
function MovieCard({ movie }) {

    if(!movie) return null
    return(
    
    <article className={styles.card}>
        <img src={movie.movie_image} alt="" />
        <h2><span >{movie.title}</span></h2>
        <h3> {movie.director}</h3>
        <h3>{movie.year}</h3>
        <p>{movie.price}</p>
    </article>
)
}

export default MovieCard;