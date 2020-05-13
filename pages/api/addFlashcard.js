import Flashcard from '../../models/Flashcard'
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
    const flashcard = await Flashcard.findOne({ _id }).populate("user")
    res.status(200).json(flashcard)
}

async function handlePostRequest(req, res) {
    if (!("authorization" in req.headers)) {
        return res.status(401).send("No authorization")
    }
    try {
        const { question, answer, category } = req.body
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        if (!question || !answer || !category) {
            return res.status(422).send("Your flashcard is missing one or more fields")
        }
        const flashcard = await new Flashcard({
            user: userId,
            question,
            answer,
            category
        }).save()
        res.status(201).json(flashcard)
    } catch (err) {
        console.error(err)
        return res.status(500).send("A server error ocurred when publishing your flashcard.")
    }
}

async function handleDeleteRequest(req, res) {
    try {
        const { _id } = req.query
        await Flashcard.findOneAndDelete({ _id })
        res.status(204).json({})
    } catch (err) {
        console.error(err)
        return res.status(404).send("There was a problem deleting the flashcard")
    }
}
