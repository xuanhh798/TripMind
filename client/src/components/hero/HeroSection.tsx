import { useState } from "react";
import "./HeroSection.css";

export default function HeroSection() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the input value (e.g., send to an API or log it)
    console.log("Submitted value:", inputValue);
    // Clear the input after submission
    setInputValue("");
  };

  return (
    <section className="hero-section">
      <h1 className="hero-heading">TripMind 🧠</h1>
      <p className="hero-text">Explore your dream vacation.</p>

      {/* Text input with submit button */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Take me to London, Paris, and Japan for 14 days."
          className="text-input duration-700"
        />
        <button type="submit" className="submit-btn duration-700">
          Submit
        </button>
      </form>
    </section>
  );
}
