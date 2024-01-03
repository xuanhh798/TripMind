import "./App.css";
import { useState } from "react";

import "./HeroSection.css";
import axios from "axios";
import BrowsePage from "./components/page/BrowsePage.tsx";
import ArticlePage from "./components/page/ArticlePage.tsx";
import Navbar from "./components/navbar/Navbar.tsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const sampleContent = {
    title: "Title: An Adventurous Trio: United States, Japan, and Sweden",
    subheadings: [
      null,
      "United States: Land of the Free, Home of the Whacky",
      "Japan: Where Tradition and Quirkiness Collide",
      "Sweden: From ABBA to Vikings",
      "Conclusion",
    ],
    paragraphs: [
      [
        "Introduction:",
        "Hello there, fellow wanderers and adventure seekers! Today, I have a thrilling trio of destinations in store for you. Brace yourselves for a rollercoaster ride as we embark on a journey to the United States, Japan, and Sweden. Get ready to explore the hidden gems, cultural wonders, and bizarre encounters that await you in these incredible countries. Buckle up; it's going to be a wild ride!",
      ],
      [
        "Ah, the United States, a country known for its larger-than-life everything. From skyscrapers that defy gravity to food portions that compete with human consumption capabilities, this land truly knows how to keep you guessing.",
        "1. The Grand Canyon National Park: A Natural Marvel",
        "Our first stop takes us to the Grand Canyon National Park in Arizona. Be prepared to have your jaw drop, your heart race, and perhaps your sense of scale forever skewed. Standing at the edge of this immense abyss, it's hard not to feel a sense of awe-inspiring insignificance.",
        "2. New Orleans: Jazz, Ghosts, and All That Jazz",
        "Next up, we're heading to New Orleans. This vibrant city will envelop you with its lively music, finger-licking Creole cuisine, and a touch of voodoo mystery. Take a stroll through the French Quarter, where soulful blues notes will guide you past colorful architecture and into a world where the past seems to echo.",
      ],
      [
        "Now, pack your bags and catch a flight to Japan – a country where ancient traditions and cutting-edge technology coexist harmoniously, offering endless surprises at every turn.",
        "1. Tokyo: Neon Lights and Unexpected Delights",
        "Our first Japanese destination is Tokyo, a city that pulsates with energy and rivals Blade Runner's futuristic atmosphere. Witness the Tokyo skyline from the observation decks of high-rise buildings, marvel at the quirky fashion in Harajuku, and ensure you experience the culinary perfection of sushi at least once.",
        "2. Kyoto: Tranquility Amidst Cherry Blossoms",
        "From the bustling city, we move to Kyoto, where serenity and tradition run deep. Explore ancient temples, stroll through Zen gardens, and bow respectfully to the cherry blossoms that paint the city with delicate petals. Don't forget to try a traditional tea ceremony – a meditative experience to calm your spirit after the hustle and bustle of Tokyo.",
      ],
      [
        "Our final destination brings us to Sweden, a country that seems to have emerged straight out of a fairytale or an ABBA music video.",
        "1. Stockholm: Modern Flair Meets Nordic Charm",
        "In Sweden's capital, Stockholm, you'll encounter a captivating blend of old-world charm and modern innovation. Take a leisurely boat ride through the archipelago, indulge in the iconic Swedish meatballs, and delve into the world of Vikings at the Vasa Museum.",
        "2. Abisko National Park: Aurora Borealis Extravaganza",
        "For our grand finale, we venture to Abisko National Park in the far north of Sweden, where the Northern Lights dance across the night sky. Brace yourself for an otherworldly experience that will leave you breathless and contemplating the mysteries of the universe.",
      ],
      [
        "And there you have it, my dear fellow adventurers, a whirlwind tour through the United States, Japan, and Sweden. From breathtaking natural wonders to cultural curiosities, these countries promise an unforgettable journey. So, pack your suitcases, embrace the unexpected, and embark on an adventure that will leave you with memories to last a lifetime. Bon voyage, my intrepid friends!",
      ],
    ],
    previewImages: [],
    contentImages: [],
  };

  sampleContent.contentImages = [
    "sa-ls.jpeg",
    "japan-ls.jpeg",
    "london-ls.jpeg",
  ];
  sampleContent.previewImages = ["sa.jpeg", "japan.jpeg", "london.jpeg"];

  const [inputText, setinputText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState(null);
  // const navigate = useNavigate();

  const handleInputChange = (e) => {
    setinputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const serverResponse = await axios.post("/api", {
        inputText,
      });

      const responseText = serverResponse.data.response;
      console.log("Server response value:", responseText);
      setResponse(responseText);

      // Process the input value (e.g., send to an API or log it)
      console.log("Submitted value:", inputText);
      // Clear the input after submission
      setinputText("");

      setSubmitted(true);
      // navigate("/page", { state: sampleContent });
    } catch (error) {
      console.error("Error sending request to server:", error);
    }
  };

  return (
    <>
      <Router>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route
            path="/"
            element={
              submitted ? (
                <Navigate to="/page" state={response} />
              ) : (
                <div>
                  <div className="p-4 sm:p-8 flex flex-col max-w-6xl mx-auto">
                    {" "}
                    <section className="hero-section">
                      <h1 className="hero-heading">TripMind 🧠</h1>
                      <p className="hero-text">
                        AI Virtual travel assistant <br />
                        <i>
                          "Saving you from bad decisions one trip at a time!"
                        </i>
                      </p>

                      {/* Text input with submit button */}
                      <form onSubmit={handleSubmit}>
                        <input
                          type="text"
                          value={inputText}
                          onChange={handleInputChange}
                          placeholder="Take me to London, Paris, and Japan."
                          className="text-input duration-700"
                        />
                        <button
                          type="submit"
                          className="submit-btn duration-700"
                        >
                          Submit
                        </button>
                      </form>
                    </section>
                  </div>
                  {/* <Footer /> */}
                </div>
              )
            }
          />
          {/* <Route path="/browse" element={<BrowsePage />} /> */}
          <Route path="/page" element={<ArticlePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
