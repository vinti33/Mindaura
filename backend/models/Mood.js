import mongoose from "mongoose"

const MoodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mood: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    default: "",
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const Mood = mongoose.models.Mood || mongoose.model("Mood", MoodSchema)

export default Mood
