import Mood from "../models/Mood.js";

// Helper to calculate longest streak (consecutive days with moods)
const calculateLongestStreak = (moods) => {
  if (!moods.length) return 0;

  let longest = 1;
  let currentStreak = 1;

  for (let i = 1; i < moods.length; i++) {
    const prevDate = new Date(moods[i - 1].date);
    const currDate = new Date(moods[i].date);
    const diffDays = Math.round((currDate - prevDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) currentStreak++;
    else currentStreak = 1;

    if (currentStreak > longest) longest = currentStreak;
  }
  return longest;
};

// Helper to find most common mood
const calculateMostCommonMood = (moods) => {
  if (!moods.length) return "N/A";

  const moodCount = {};
  moods.forEach(m => {
    moodCount[m.mood] = (moodCount[m.mood] || 0) + 1;
  });

  let maxCount = 0;
  let mostCommon = "";
  for (let mood in moodCount) {
    if (moodCount[mood] > maxCount) {
      maxCount = moodCount[mood];
      mostCommon = mood;
    }
  }

  const percentage = ((maxCount / moods.length) * 100).toFixed(0);
  return `${mostCommon} (${percentage}%)`;
};

// Helper to calculate average mood (simple approach)
const calculateAverageMood = (moods) => {
  if (!moods.length) return "N/A";

  const moodIntensityMap = {
    "Happy": 8,
    "Calm": 7,
    "Focused": 6,
    "Tired": 4,
    "Sad": 3,
    "Anxious": 2,
    "Stressed": 1
  };

  let total = 0;
  moods.forEach(m => {
    total += moodIntensityMap[m.mood] || 5; // Default 5 if unknown
  });

  const avg = total / moods.length;
  if (avg >= 7) return "Calm/Happy";
  if (avg >= 5) return "Focused/Neutral";
  if (avg >= 3) return "Tired/Anxious";
  return "Stressed";
};

// Controller to get user mood trends
export const getUserMoodTrends = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware
    const moods = await Mood.find({ user: userId }).sort({ date: 1 });

    const totalEntries = moods.length;
    const longestStreak = calculateLongestStreak(moods);
    const mostCommonMood = calculateMostCommonMood(moods);
    const averageMood = calculateAverageMood(moods);

    res.json({ totalEntries, longestStreak, mostCommonMood, averageMood, moods });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
