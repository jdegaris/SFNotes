import mongoose from 'mongoose'

const { ObjectId, String } = mongoose.Schema.Types

const VideoSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    mediaUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
})

export default mongoose.models.Video || mongoose.model('Video', VideoSchema)