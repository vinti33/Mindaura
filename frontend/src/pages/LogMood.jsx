import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/logmood.css';
import { Smile, Frown, Meh, Zap, Heart, Cloud, Sun, XCircle } from 'react-feather';

// Define the available mood options
const moodOptions = [
    { label: 'Happy', icon: Smile, color: '#4ade80' },    // Green
    { label: 'Calm', icon: Cloud, color: '#60a5fa' },     // Blue
    { label: 'Energetic', icon: Zap, color: '#fcd34d' },  // Yellow
    { label: 'Anxious', icon: XCircle, color: '#f87171' },// Red/Orange
    { label: 'Sad', icon: Frown, color: '#9ca3af' },      // Gray
    { label: 'Loved', icon: Heart, color: '#f472b6' },    // Pink
    { label: 'Tired', icon: Sun, color: '#e5e7eb' },      // Light Gray
];

function LogMood() {
    const navigate = useNavigate();
    const [selectedMood, setSelectedMood] = useState(null);
    const [notes, setNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Handler for submitting the mood log
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!selectedMood) {
            alert("Please select a mood before submitting!");
            return;
        }

        setIsLoading(true);
        
        // --- API Submission Logic Placeholder ---
        console.log("Submitting Mood:", selectedMood.label);
        console.log("Notes:", notes);
        
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        // ----------------------------------------

        setIsLoading(false);
        alert(`Successfully logged your feeling: ${selectedMood.label}!`);
        navigate('/dashboard'); 
    };

    return (
        <div className="logmood-container">
            <header className="logmood-header">
                <h1>How Are You Feeling Right Now?</h1>
                <p>Select the mood that best captures your current aura.</p>
            </header>

            <form onSubmit={handleSubmit} className="mood-form">
                
                {/* Mood Selection Grid */}
                <div className="mood-grid">
                    {moodOptions.map((mood) => (
                        <div
                            key={mood.label}
                            className={`mood-option ${selectedMood?.label === mood.label ? 'selected' : ''}`}
                            style={{ '--mood-color': mood.color }}
                            onClick={() => setSelectedMood(mood)}
                            aria-label={`Select mood: ${mood.label}`}
                        >
                            <mood.icon size={36} className="mood-icon" />
                            <span className="mood-label">{mood.label}</span>
                        </div>
                    ))}
                </div>

                {/* Notes/Journal Entry */}
                <div className="notes-section">
                    <label htmlFor="notes">Optional: What's on your mind?</label>
                    <textarea
                        id="notes"
                        rows="4"
                        placeholder="e.g., 'Had a great conversation with a friend,' or 'Feeling stressed about the deadline.'"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                    type="submit" 
                    className="submit-mood-btn" 
                    disabled={isLoading || !selectedMood}
                >
                    {isLoading ? 'Saving Aura...' : 'Log Mood & Meditate'}
                </button>
            </form>
        </div>
    );
}

export default LogMood;