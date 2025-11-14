import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css"; // Assuming this handles the great styling!

// --- Custom Hook for Quote Rotation (Better separation of concerns) ---
const useQuoteRotator = (quotes, interval = 5000) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, interval);

    // Cleanup on component unmount
    return () => clearInterval(timer);
  }, [quotes.length, interval]); // Dependencies: only re-run if quotes array length or interval changes

  return quotes[currentQuoteIndex];
};
// ---------------------------------------------------------------------

const inspirationalQuotes = [
  "Peace comes from within. Do not seek it without.",
  "Every day is a new beginning.",
  "Your mind is a garden. Your thoughts are the seeds.",
  "Calm mind brings inner strength and self-confidence.",
  "Happiness is not something ready made. It comes from your own actions.",
];

function Home() {
  
  const navigate = useNavigate();

  // 💡 SIMULATED AUTH: In a real app, this would come from a global state/context
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  
  // Use the custom hook for the rotating quote
  const currentQuote = useQuoteRotator(inspirationalQuotes, 6000); // 6 seconds for a slightly slower pace

  // Handler for primary action button
  const handlePrimaryAction = useCallback(() => {
      // If logged in, go to the dashboard/main app
      if (isAuthenticated) {
          navigate("/dashboard"); 
      } else {
          // If not logged in, prompt sign-up
          navigate("/signup");
      }
  }, [isAuthenticated, navigate]);

  // Handler for secondary action button
  const handleSecondaryAction = useCallback(() => {
      // If logged in, logout or view profile (depending on design)
      if (isAuthenticated) {
          // You'd typically call a logout function here, but we'll simulate a redirect.
          alert("Simulated Logout/Profile View"); 
      } else {
          // If not logged in, go to the login page
          navigate("/login");
      }
  }, [isAuthenticated, navigate]);


  return (
    <div className="home-container">
      <div className="overlay"></div> 
      {/* Visual aid:  */}
      <div className="home-content">
        <h1 className="home-title">🧘 Mind Aura</h1>
        <p className="home-subtitle">
          Track your mind. Heal your soul. Explore your emotions and find calm.
        </p>

        <div className="home-quote">
          <span>"{currentQuote}"</span>
        </div>

        

        <div className="home-buttons">
  <button onClick={handlePrimaryAction} className="btn primary-btn">
    {isAuthenticated ? "Go to Dashboard" : "Get Started"}
  </button>
  
  <button onClick={handleSecondaryAction} className="btn secondary-btn">
    {isAuthenticated ? "Profile / Logout" : "Login"}
  </button>
</div>

      </div>

      {/* Floating shapes (Kept as is - great for a calming background!) */}
      <div className="floating-shapes">
        <span className="shape circle"></span>
        <span className="shape triangle"></span>
        <span className="shape square"></span>
      </div>
    </div>
  );
}

export default Home;