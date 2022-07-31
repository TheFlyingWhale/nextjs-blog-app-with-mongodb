import Link from "next/link";

import styles from "../styles/Nav.module.css";

const Nav = () => {
    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                <ListItem href="/">Home</ListItem>
                <ListItem href="/add-post">Add post</ListItem>
            </ul>
        </nav>
    );
};

interface ListItemProps {
    children: React.ReactNode;
    href: string;
}

const ListItem: React.FC<ListItemProps> = ({ children, href }) => {
    return (
        <li className={styles.item}>
            <Link href={href}>{children}</Link>
        </li>
    );
};

export default Nav;
