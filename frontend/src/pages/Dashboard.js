import { API_BASE_URL } from "../api";  
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  PlusCircle,
  MessageSquare,
  TrendingUp,
  Zap,
  Activity,
  Coffee,
  Music,
  Smile,
  Frown,
  Cloud,
  HelpCircle,
  Info,
} from "react-feather";
import "../styles/dashboard.css";

// --- Helper Data (Expanded for better variety) ---
const moodSuggestions = {
  Happy: {
    icon: Smile,
    color: "#4CAF50",
    emoji: "😄",
    exercise: "Yoga or a light jog 🤸",
    food: "Fruit bowl or smoothie 🍓",
    songs: "‘Good Life’ – OneRepublic 🎧",
    tip: "Keep sharing your positivity 💛",
  },
  Sad: {
    icon: Frown,
    color: "#6495ED",
    emoji: "😢",
    exercise: "Stretch or meditate 🧘",
    food: "Warm tea or soup 🍵",
    songs: "‘Let Her Go’ – Passenger 🎶",
    tip: "It’s okay to slow down 💙",
  },
  Energetic: {
    icon: Zap,
    color: "#FF9800",
    emoji: "⚡",
    exercise: "Dance or HIIT workout 🔥",
    food: "Bananas, nuts, or protein bar 💪",
    songs: "‘On Top of the World’ 🎵",
    tip: "Use your energy creatively 🚀",
  },
  Calm: {
    icon: Cloud,
    color: "#9370DB",
    emoji: "☁️",
    exercise: "Deep breathing or mindful walk 🌳",
    food: "Green tea or salad 🥗",
    songs: "‘Weightless’ – Marconi Union 🎼",
    tip: "Enjoy your current balance 🌸",
  },
  Loved: {
    icon: Heart,
    color: "#FF1493",
    emoji: "❤️",
    exercise: "Take a gentle walk with loved ones 👫",
    food: "Chocolate or favorite dessert 🍫",
    songs: "‘Perfect’ – Ed Sheeran 🎶",
    tip: "Embrace the love around you 🌹",
  },
  Anxious: {
    icon: Frown,
    color: "#FF4500",
    emoji: "😰",
    exercise: "Try deep breathing or short meditation 🧘‍♂️",
    food: "Herbal tea or light snacks 🍵",
    songs: "Calming instrumental or soft lo-fi 🎵",
    tip: "Pause, breathe, and take small steps 💛",
  },
  Neutral: {
    icon: Info,
    color: "#808080",
    emoji: "😐",
    exercise: "Short walk or stretch 🌿",
    food: "Anything light and healthy 🥗",
    songs: "Soft background music 🎼",
    tip: "Maintain balance and observe your feelings 🕊️",
  },
  Unknown: {
    icon: HelpCircle,
    color: "#A9A9A9",
    emoji: "😐",
    exercise: "Go for a short mindful walk.",
    food: "Eat something refreshing.",
    songs: "Try peaceful lo-fi sounds.",
    tip: "Breathe deeply and stay kind.",
  },
};


// --- Stat Card Component ---
const InfoCard = ({ title, value, onClick, icon: Icon }) => (
  <div className={`info-card ${onClick ? "clickable" : ""}`} onClick={onClick}>
    <div className="card-header">
      {Icon && <Icon size={20} className="card-icon" />}
      <h3>{title}</h3>
    </div>
    <p className="card-value">{value}</p>
    {onClick && <span className="action-link">View Charts →</span>}
  </div>
);

// --- Suggestion Card Component ---
const SuggestionCard = ({ title, value, icon: Icon, color }) => (
  <div className="suggestion-card fade-in-up" style={{ "--card-color": color }}>
    <div className="suggestion-header">
      <Icon size={24} className="suggestion-icon" style={{ color: color }} />
      <h4>{title}</h4>
    </div>
    <p>{value}</p>
  </div>
);

function Dashboard() {
  const [moodData, setMoodData] = useState(null);
  const navigate = useNavigate();

  const navigateLog = useCallback(() => navigate("/log-mood"), [navigate]);
  const navigateChat = useCallback(() => navigate("/chat"), [navigate]);
  const navigateTrends = useCallback(() => navigate("/trends"), [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/moods/trends`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setMoodData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const latestMoodLabel = moodData?.moods?.length
    ? moodData.moods[moodData.moods.length - 1].mood
    : "Unknown";

  const latestMood =
    latestMoodLabel in moodSuggestions ? latestMoodLabel : "Unknown";

  const suggestions = moodSuggestions[latestMood];
  const streak = moodData?.longestStreak || 0;

  return (
    <div className="dashboard-container">
      {/* Welcome Card */}
      <div className="welcome-card pop-in">
        <div className="welcome-content">
          <h2>
            Welcome back, Aura Explorer{" "}
            <Heart size={20} className="welcome-heart" />
          </h2>
          <p className="streak-info">
            You’re on a{" "}
            <b className="streak-value">
              {streak}-day 🔥
            </b>{" "}
            streak — stay consistent and nurture your calm 🌿
          </p>
        </div>

        <div className="welcome-buttons">
          <button className="primary-btn pulse-button" onClick={navigateLog}>
            <PlusCircle size={20} /> Log Mood
          </button>
          <button className="outline-btn glow-button" onClick={navigateChat}>
            <MessageSquare size={20} /> Chat with Aura AI
          </button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="info-cards">
        <InfoCard
          title="Last Logged Mood"
          value={`${latestMood} ${suggestions.emoji}`}
          icon={Activity}
        />
        <InfoCard
          title="Your Weekly Trend"
          value={`Longest Streak: ${streak} days 🔥`}
          icon={TrendingUp}
          onClick={navigateTrends}
        />
      </div>

      {/* Suggestions */}
      <div className="suggestions">
        <h3>Personalized Wellbeing Suggestions 🌼</h3>
        <div className="suggestion-grid">
          <SuggestionCard
            title="Move"
            value={suggestions.exercise}
            icon={Activity}
            color={moodSuggestions[latestMood].color}
          />
          <SuggestionCard
            title="Nourish"
            value={suggestions.food}
            icon={Coffee}
            color={moodSuggestions[latestMood].color}
          />
          <SuggestionCard
            title="Listen"
            value={suggestions.songs}
            icon={Music}
            color={moodSuggestions[latestMood].color}
          />
          <SuggestionCard
            title="Focus Tip"
            value={suggestions.tip}
            icon={Info}
            color={moodSuggestions[latestMood].color}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
