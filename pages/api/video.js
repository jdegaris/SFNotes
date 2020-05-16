import Video from '../../models/Video'
import User from '../../models/User'
import jwt from 'jsonwebtoken'

import connectDb from '../../utils/connectDb'

connectDb()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await handleGetRequest(req, res)
            break;
        case "POST":
            await handlePostRequest(req, res)
            break;
        case "DELETE":
            await handleDeleteRequest(req, res)
            break;
        default:
            res.status(405).send(`Method ${req.method} not allowed`)
            break;
    }
}

async function handleGetRequest(req, res) {
    const { _id, aut } = req.query
    const video = await Video.findOne({ _id }).populate("user")
    res.status(200).json(video)
}

async function handlePostRequest(req, res) {
    if (!("authorization" in req.headers)) {
        return res.status(401).send("No authorization")
    }
    try {
        const { mediaUrl, title, description, category } = req.body
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        if (!mediaUrl || !title || !category) {
            return res.status(422).send("Your video is missing one or more fields")
        }
        const video = await new Video({
            user: userId,
            mediaUrl,
            title,
            description,
            category
        }).save()
        res.status(201).json(video)
    } catch (err) {
        console.error(err)
        return res.status(500).send("A server error ocurred when publishing your video.")
    }
}

async function handleDeleteRequest(req, res) {
    try {
        const { _id } = req.query
        await Video.findOneAndDelete({ _id })
        res.status(204).json({})
    } catch (err) {
        console.error(err)
        return res.status(404).send("There was a problem deleting the video")
    }
}
