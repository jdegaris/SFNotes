import mongoose from 'mongoose'

const { String, ObjectId } = mongoose.Schema.Types

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    flashcardList: [{
        flashcard: {
            type: ObjectId,
            ref: 'Flashcard'
        },
    }],
    videoList: [{
        video: {
            type: ObjectId,
            ref: 'Video'
        },
    }],
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export default mongoose.models.User || mongoose.model("User", UserSchema)