import mongoose from 'mongoose'

const { ObjectId, String } = mongoose.Schema.Types

const NoteSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    note: {
        type: String
    }
})

export default mongoose.models.Note || mongoose.model("Note", NoteSchema)