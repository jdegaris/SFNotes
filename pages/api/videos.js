// import books from '../../static/books.json'
import Video from '../../models/Video'
import User from '../../models/User'

import connectDb from '../../utils/connectDb'

connectDb()

export default async (req, res) => {
    const videos = await Video.find()
    res.status(200).json(videos)
}