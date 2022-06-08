import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TodoSchema = new Schema(
  {
    description: { type: String, required: true },
    completed: { type: Boolean, required: true, default: false },
    user: { type: String, required: true }
  }
)