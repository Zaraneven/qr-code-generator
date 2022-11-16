import mongoose from "mongoose";

const QcodeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    url: {
        type: String,
        required: [true, 'URL is required']
    }
})

export default mongoose.model('Qcode', QcodeSchema);