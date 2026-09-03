import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import MovieCard from "../../components/MovieCard/MovieCard";

function MovieDetailPage () {
    const {movieId} = useParams()
    const {data: movie, error, loading} = useFetch(`/movies/${movieId}`)
    
    if(loading) return <p>Cargando peliculas</p>
    if(error || !movie) return <p>Pelicula no encontrada</p>

    return( 
        <main>
            <MovieCard movie={movie} />
        </main>
    );
}

export default MovieDetailPage;