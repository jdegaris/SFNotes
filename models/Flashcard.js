import mongoose from 'mongoose'

const { String } = mongoose.Schema.Types

const FlashcardSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    category: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: Number,
        required: true
    }
})

export default mongoose.models.Flashcard || mongoose.model('Flashcard', FlashcardSchema)