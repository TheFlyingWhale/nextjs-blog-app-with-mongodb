import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";
import * as mongoDB from "mongodb";
// const ObjectId = require("mongodb").ObjectId;

type Data = {
    message: string | Error;
    success: boolean;
};

type ReqRes = (req: NextApiRequest, res: NextApiResponse<Data>) => void;

const handler: ReqRes = async (req, res) => {
    // switch the methods
    switch (req.method) {
        case "GET": {
            return getPosts(req, res);
        }
        case "POST": {
            return addPost(req, res);
        }
        case "PUT": {
            // return updatePost(req, res)
        }
        case "DELETE": {
            // return deletePost(req, res)
        }
    }
};

export default handler;

const getPosts: ReqRes = async (req, res) => {
    try {
        // connect to the database
        const { db } = await connectToDatabase();
        // fetch the posts
        const posts = await db
            .collection("posts")
            .find({})
            .sort({ published: -1 })
            .toArray();
        // return the posts
        return res.json({
            message: JSON.parse(JSON.stringify(posts)),
            success: true,
        });
    } catch (error) {
        // return the error
        if (error instanceof Error) {
            return res.json({
                message: error,
                success: false,
            });
        } else {
            console.log("Unexpected error", error);
        }
    }
};

const addPost: ReqRes = async (req, res) => {
    try {
        // connect to the database
        const { db } = await connectToDatabase();
        // add the post
        await db.collection("posts").insertOne(JSON.parse(req.body));
        // return a message
        return res.json({
            message: "Post added successfully",
            success: true,
        });
    } catch (error) {
        // return the error
        if (error instanceof Error) {
            return res.json({
                message: error,
                success: false,
            });
        } else {
            console.log("Unexpected error", error);
        }
    }
};
