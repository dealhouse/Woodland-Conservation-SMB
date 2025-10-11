/**
 * @file Home.js
 * @description The Home Page component for the Woodland Conservation Site. This component includes a hero section, a text-to-speech feature for accessibility, and information about the site's conservation initiatives.
 *
 * React functions and components are documented to ensure clarity and maintainability. Inline comments are used sparingly to provide context where necessary.
 *
 * COTS (Commercial Off-The-Shelf Software):
 * - React: https://reactjs.org/
 * - React Icons: https://react-icons.github.io/react-icons/
 * - Speech Synthesis API: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
 * - Murf AI: https://murf.ai/
 *
 * Image Source Credits:
 * - Background Image: Local asset located at "../assets/Light BG Image.jpg"
 * - Hero Section Image: https://www.pexels.com/
 *
 * @author Raish Raj Joshi, Tania Terence
 */

import { useState } from "react"; // React hook for managing state
import { FaVolumeUp, FaPause } from "react-icons/fa"; // Icons for text-to-speech buttons
import image from "../assets/Light BG Image.jpg"; // Background image for the hero section

/**
 * @function Home
 * @description Renders the Home Page of the Woodland Conservation Site, including a hero section, text-to-speech functionality, and content sections for conservation initiatives.
 *
 * @returns {JSX.Element} The rendered Home Page component.
 */
export default function Home() {
  // State to track which text is currently being spoken
  const [speakingText, setSpeakingText] = useState("");

  /**
   * Handles text-to-speech functionality by toggling speech synthesis for the given text.
   *
   * @param {string} text - The text to be spoken.
   * 
   * @author Raish Raj Joshi
   */
  const handleSpeakText = (text) => {
    if (speakingText === text) {
      // Pause and cancel if the same text is already being spoken
      window.speechSynthesis.pause();
      window.speechSynthesis.cancel();
      setSpeakingText(""); // Reset speaking text
    } else {
      // Start speaking new text
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-CA"; // Set language to Canadian English

      // Reset state when speech ends
      utterance.onend = () => {
        setSpeakingText("");
      };

      window.speechSynthesis.speak(utterance);
      setSpeakingText(text); // Update speaking text
    }
  };

  return (
    <div>
      {/* Murf AI Embed for Text-to-Speech - Tania Terence*/}
      <iframe
        className="murf-embed w-full"
        height="102"
        src="https://murf.ai/embeds/index.html?embedId=m4nccss4"
        allowFullScreen
        title="Murf Embed Player"
        style={{ border: "none" }}
      ></iframe>
      <script src="https://murf.ai/embeds/widget.js"></script>

      {/* Hero Section */}
      <div
        className="relative w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-between px-6 py-12">
          {/* Left Section - Hero Text */}
          <div className="w-1/2 text-left text-white">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4 flex flex-col">
              Welcome to the{" "}
              <span className="text-light-primary dark:text-dark-primary">
                Woodland Conservation Site
              </span>
            </h1>
            <p className="text-lg lg:text-2xl max-w-3xl mx-auto flex items-center">
              <button
                onClick={() =>
                  handleSpeakText(
                    "Explore the serenity of nature and contribute to preserving the delicate balance of our ecosystem. Learn how to protect wildlife, engage in sustainable practices, and celebrate the beauty of our natural world."
                  )
                }
                className="mr-4 p-2 bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
                aria-label="Read out loud"
              >
                {speakingText ===
                "Explore the serenity of nature and contribute to preserving the delicate balance of our ecosystem. Learn how to protect wildlife, engage in sustainable practices, and celebrate the beauty of our natural world." ? (
                  <FaPause className="text-xl" />
                ) : (
                  <FaVolumeUp className="text-xl" />
                )}
              </button>
              Explore the serenity of nature and contribute to preserving the
              delicate balance of our ecosystem. Learn how to protect wildlife,
              engage in sustainable practices, and celebrate the beauty of our
              natural world.
            </p>
          </div>

          {/* Right Section - Hero Image */}
          <div className="w-1/2">
            <img
              src={image}
              alt="Woodland Conservation"
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Page Content Section */}
      <div className="px-4 py-10 lg:px-20">
        <h2 className="text-3xl font-semibold mb-6 text-center">What We Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Conservation Projects Card */}
          <div className="bg-light-background text-black dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-4">
              Conservation Projects
            </h3>
            <p>
              We focus on preserving natural habitats and wildlife to ensure a
              healthy ecosystem for future generations.
            </p>
            <button
              onClick={() =>
                handleSpeakText(
                  "We focus on preserving natural habitats and wildlife to ensure a healthy ecosystem for future generations."
                )
              }
              className="mr-4 p-2 bg-transparent text-blue-500 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
              aria-label="Read out loud"
            >
              {speakingText ===
              "We focus on preserving natural habitats and wildlife to ensure a healthy ecosystem for future generations." ? (
                <FaPause className="text-xl" />
              ) : (
                <FaVolumeUp className="text-xl" />
              )}
            </button>
          </div>

          {/* Sustainable Practices Card */}
          <div className="bg-light-background text-black dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-4">
              Sustainable Practices
            </h3>
            <p>
              Learn about eco-friendly practices that help reduce our carbon
              footprint and contribute to a greener planet.
            </p>
            <button
              onClick={() =>
                handleSpeakText(
                  "Learn about eco-friendly practices that help reduce our carbon footprint and contribute to a greener planet."
                )
              }
              className="mr-4 p-2 bg-transparent text-blue-500 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
              aria-label="Read out loud"
            >
              {speakingText ===
              "Learn about eco-friendly practices that help reduce our carbon footprint and contribute to a greener planet." ? (
                <FaPause className="text-xl" />
              ) : (
                <FaVolumeUp className="text-xl" />
              )}
            </button>
          </div>

          {/* Wildlife Protection Card */}
          <div className="bg-light-background text-black dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-4">Wildlife Protection</h3>
            <p>
              We are committed to protecting endangered species and restoring
              biodiversity to our natural surroundings.
            </p>
            <button
              onClick={() =>
                handleSpeakText(
                  "We are committed to protecting endangered species and restoring biodiversity to our natural surroundings."
                )
              }
              className="mr-4 p-2 bg-transparent text-blue-500 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
              aria-label="Read out loud"
            >
              {speakingText ===
              "We are committed to protecting endangered species and restoring biodiversity to our natural surroundings." ? (
                <FaPause className="text-xl" />
              ) : (
                <FaVolumeUp className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
