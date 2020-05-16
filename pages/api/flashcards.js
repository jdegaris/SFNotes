// import books from '../../static/books.json'
import Flashcard from '../../models/Flashcard'
import User from '../../models/User'

import connectDb from '../../utils/connectDb'

connectDb()

export default async (req, res) => {
    const flashcards = await Flashcard.find()
    res.status(200).json(flashcards)
}