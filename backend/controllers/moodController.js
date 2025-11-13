import Mood from "../models/Mood.js";

// Log a mood
export const logMood = async (req, res) => {
  try {
    const { mood } = req.body;

    if (!mood) {
      return res.status(400).json({ message: "Mood is required" });
    }

    const newMood = new Mood({
      user: req.user.id,   // ✅ changed from userId → user
      mood,
      date: new Date(),
    });

    await newMood.save();
    res.status(201).json({ message: "Mood logged successfully", newMood });
  } catch (error) {
    console.error("Error logging mood:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get mood trends
export const getUserMoodTrends = async (req, res) => {
  try {
    // ✅ changed from userId → user
    const moods = await Mood.find({ user: req.user.id }).sort({ date: 1 });

    // Calculate streak
    let longestStreak = 0, currentStreak = 0;
    let prevDate = null;

    moods.forEach((m) => {
      const moodDate = new Date(m.date);
      if (prevDate) {
        const diff = (moodDate - prevDate) / (1000 * 60 * 60 * 24);
        if (diff <= 1.5) currentStreak++;
        else currentStreak = 1;
      } else currentStreak = 1;
      prevDate = moodDate;
      longestStreak = Math.max(longestStreak, currentStreak);
    });

    res.status(200).json({ moods, longestStreak });
  } catch (error) {
    console.error("Error fetching mood trends:", error);
    res.status(500).json({ message: "Server error" });
  }
};
