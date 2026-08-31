import styles from "./Footer.module.css";

function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.text}>Javi Asuncion - The Bridge - 2026</p>
            <div className={styles.socials}>
                
                <a    href="https://www.linkedin.com/in/javier-asunci%C3%B3n-047499252/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                >
                    LinkedIn
                </a>
                
                 <a   href="https://github.com/asuncionjavier-max"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                >
                    GitHub
                </a>
            </div>
        </footer>
    );
}

export default Footer;