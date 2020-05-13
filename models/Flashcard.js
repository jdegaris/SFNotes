import mongoose from 'mongoose'

const { ObjectId, String } = mongoose.Schema.Types

const FlashcardSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Platform App Builder',
            'Platform Developer I',
            'Administrator'
        ]
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }

})

export default mongoose.models.Flashcard || mongoose.model("Flashcard", FlashcardSchema)