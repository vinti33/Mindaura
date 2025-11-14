import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Activity, Filter } from 'react-feather';

// Mock data for demonstration (replace with API data later)
const mockStats = {
    averageMood: 'Calm/Focused',
    mostCommonMood: 'Happy (35%)',
    totalEntries: 42,
    longestStreak: 12,
};

function Trends() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('7-days');

    // StatCard component
    const StatCard = ({ icon: Icon, title, value }) => (
        <div className="stat-card">
            <Icon size={24} className="stat-icon" />
            <h3>{title}</h3>
            <p className="stat-value">{value}</p>
        </div>
    );

    return (
        <div className="trends-container">
            {/* Header */}
            <header className="trends-header">
                <TrendingUp size={36} className="header-icon" />
                <h1>Your Aura Trends</h1>
            </header>
            <p className="trends-subtitle">
                Visualize your emotional journey and find patterns for deeper healing.
            </p>

            {/* Filter */}
            <div className="trends-controls">
                <div className="filter-group">
                    <Filter size={18} />
                    <label htmlFor="time-filter">Time Period:</label>
                    <select
                        id="time-filter"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="7-days">Last 7 Days</option>
                        <option value="30-days">Last 30 Days</option>
                        <option value="all-time">All Time</option>
                    </select>
                </div>
            </div>

            {/* Stats */}
            <section className="stats-grid">
                <StatCard icon={Activity} title="Average Mood" value={mockStats.averageMood} />
                <StatCard icon={TrendingUp} title="Most Common Mood" value={mockStats.mostCommonMood} />
                <StatCard icon={Activity} title="Total Entries" value={mockStats.totalEntries} />
                <StatCard icon={Activity} title="Longest Streak" value={`${mockStats.longestStreak} days`} />
            </section>

            {/* Chart Placeholders */}
            <section className="chart-section">
                <h2>Mood Distribution - {filter}</h2>
                <div className="chart-placeholder">
                    <p>Mood Distribution Chart goes here (e.g., Pie Chart)</p>
                </div>
            </section>

            <section className="chart-section">
                <h2>Mood Over Time - {filter}</h2>
                <div className="chart-placeholder large">
                    <p>Mood Intensity Line Graph goes here (e.g., Line Chart)</p>
                </div>
            </section>

            {/* Navigation Buttons */}
            <div className="trends-buttons">
                <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
                <button onClick={() => navigate("/log-mood")}>Log Today's Mood</button>
            </div>
        </div>
    );
}

export default Trends;
