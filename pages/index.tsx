import Head from "next/head";

import Post from "../interfaces/Post";

import Nav from "../components/Nav";
import PostCard from "../components/PostCard";
import styles from "../styles/Home.module.css";

interface HomeProps {
    posts: Post[];
}

const Home: React.FC<HomeProps> = ({ posts }) => {
    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>

            <Nav />

            <header className={styles.container}>
                <h1>Home</h1>
            </header>

            <main>
                <div className={styles.container}>
                    {posts.length === 0 ? (
                        <h2>No added posts</h2>
                    ) : (
                        <ul>
                            {posts.map((post, i) => (
                                <PostCard key={i} post={post} />
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Home;

export const getServerSideProps = async () => {
    // get the current environment
    let dev = process.env.NODE_ENV !== "production";

    // request post from api
    let response = await fetch(
        `${
            dev
                ? "http://localhost:3000"
                : "https://nextjs-blog-app-with-mongodb-taupe.vercel.app"
        }/api/posts`
    );
    // extract the data
    let data = await response.json();

    return {
        props: {
            posts: data["message"],
        },
    };
};
