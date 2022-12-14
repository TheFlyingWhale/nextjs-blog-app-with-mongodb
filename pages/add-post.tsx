import React, { useState } from "react";

import Nav from "../components/Nav";
import styles from "../styles/Home.module.css";

const AddPost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [posting, setPosting] = useState(false);

    const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // reset error and message
        setError("");
        setMessage("");
        setPosting(true);

        // fields check
        if (!title || !content) return setError("All fields are required");

        // post structure
        let post = {
            title,
            content,
            published: false,
            createdAt: new Date().toISOString(),
        };

        // save the post
        let response = await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify(post),
        });

        // get the data
        let data = await response.json();

        if (data.success) {
            // reset the fields
            setTitle("");
            setContent("");
            setPosting(false);
            // set the message
            return setMessage(data.message);
        } else {
            // set the error
            setPosting(false);
            return setError(data.message);
        }
    };

    return (
        <div>
            <Nav />

            <header className={styles.container}>
                <h1>Add post</h1>
            </header>

            <main className={styles.container}>
                <form onSubmit={handlePost} className={styles.form}>
                    {error ? (
                        <div className={styles.formItem}>
                            <h3 className={styles.error}>{error}</h3>
                        </div>
                    ) : null}

                    {message ? (
                        <div className={styles.formItem}>
                            <h3 className={styles.message}>{message}</h3>
                        </div>
                    ) : null}

                    <div className={styles.formItem}>
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            placeholder="title"
                        />
                    </div>

                    <div className={styles.formItem}>
                        <label>Content</label>
                        <textarea
                            name="content"
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            placeholder="Post Content"
                        ></textarea>
                    </div>

                    <div className={styles.formItem}>
                        <button disabled={posting} type="submit">
                            {posting ? "Posting..." : "Add post"}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default AddPost;
