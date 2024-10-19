import Logo from "./Logo";
import AppNav from "./AppNav";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
    return(
        <div className={styles.sidebar}>
            <Logo />
            <AppNav/>
            <p>List of cities</p>
            <footer className={styles.footer}>
                <p className={styles.copyright}>
                    &copy; Copyrigth {new Date().getFullYear()}
                    WorldWise Inc.
                </p>
            </footer>
        </div>
    )
} 