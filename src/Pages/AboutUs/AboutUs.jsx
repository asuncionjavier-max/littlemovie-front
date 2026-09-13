import { Link } from "react-router-dom";
import styles from "./AboutUs.module.css";

function AboutUs() {
  return (
    <main className={styles.container}>
      <section className={styles.content}>
        <h1 className={styles.title}>Sobre nosotros</h1>
        <p>Pagina creada para poner a prueba mis habilidades con JavaScript</p>
        <p>FrontEnd: React</p>
        <p>BackEnd: Node.js - (Express)</p>
        <p>Deploy: Netlify & Render</p>
        <p>Creada por Javier Asunción Tarrega - 2026 </p>
      </section>
    </main>
  );
}
export default AboutUs;
