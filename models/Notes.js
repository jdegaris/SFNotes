import mongoose from 'mongoose'

const { ObjectId, String } = mongoose.Schema.Types

const VideoSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    video: {
        type: ObjectId,
        ref: 'Video'
    },
    notes: {
        type: String,
        required: true
    }
})

export default mongoose.models.Video || mongoose.model('Video', VideoSchema)