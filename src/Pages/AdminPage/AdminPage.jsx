import apiClient from "../../config/axios";
import { useRef } from "react";
import styles from "./AdminPage.module.css";
import { append } from "dom/lib/mutation";

function AdminPage() {
    const titleRef = useRef();
    const yearRef = useRef();
    const directorRef = useRef();
    const genreRef = useRef();
    const priceRef = useRef();
    const ratingRef = useRef();
    const imagenRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

    const formData = new FormData();

        formData.append("title", titleRef.current.value),
        formData.append ("year", yearRef.current.value),
        formData.append ("director", directorRef.current.value),
        formData.append("genre", genreRef.current.value),
        formData.append("price", priceRef.current.value),
        formData.append("rating", ratingRef.current.value)

        if(imagenRef.current.files[0]){
            formData.append("image", imagenRef.current.files[0]);
        } 

    try {
        await apiClient.post("/movies", formData,);
            alert("Película publicada con éxito 🎬");
        e.target.reset();
    } catch (error) {
        console.error("Error al publicar la película:", error);
        alert("Hubo un error al guardar la película.");
    }
};

return (
    <main className={styles.container}>
        <header className={styles.header}>
            <h1>Panel de Administración</h1>
            <p>Publica y gestiona las películas del catálogo</p>
        </header>

    <div className={styles.card}>
        <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
            <label htmlFor="movieTitle">Título de la película</label>
            <input type="text" id="movieTitle" required ref={titleRef} />
        </div>

        <div className={styles.row}>
            <div className={styles.formGroup}>
                <label htmlFor="yearMovie">Año</label>
                <input type="number" id="yearMovie" ref={yearRef}  />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="price">Precio (€)</label>
                <input type="number" step="0.01" id="price" required ref={priceRef} />
            </div>
        </div>

        <div className={styles.formGroup}>
            <label htmlFor="movieDirector">Director</label>
            <input type="text" id="movieDirector" required ref={directorRef}/>
        </div>

        <div className={styles.row}>
            <div className={styles.formGroup}>
                <label htmlFor="genre">Género</label>
                <input type="text" id="genre" required ref={genreRef} />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="rating">Rating</label>
                <input type="number" step="0.1" id="rating" required ref={ratingRef} />
            </div>
            
        </div>
        <div className={styles.fileGroup}>
            <label htmlFor="movieImage">Portada (Imagen)</label>
            <input 
            type="file" 
            id="movieImage" 
            accept="image/*" 
            ref={imagenRef} 
            className={styles.fileInput}
        />
            <label htmlFor="movieImage" className={styles.fileCustomLabel}>
                <span>📁</span> Seleccionar portada de película
            </label>
        </div>
        <button type="submit"
        className={styles.submitBtn}>
            Publicar película
        </button>
        </form>
    </div>
    </main>
);
}

export default AdminPage;