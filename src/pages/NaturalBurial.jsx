/**
 * Purpose: Main component displaying information about Natural Burial.
 * Parameters: None
 * Author(s): Thomas Lama
 */

import React, { useEffect, useRef, useState } from "react";
import { FaVolumeUp, FaPause } from "react-icons/fa"; // Import icons from react-icons
import backGmarker from "../assets/backGmarker.jpg"; // Import the background image for Marker Options
import burialOptionImage from "../assets/burialOption.jpg"; // Import the Burial Option background image
import firstpic from "../assets/firstpic.jpg"; // Import the firstpic background image
import GPSImage from "../assets/GPS.jpg"; // Correct relative import
import pineboxImage from "../assets/pinebox.jpg"; // Import the Pinebox image
import shroudImage from "../assets/shroud.jpg"; // Import the Shroud image
import smallBushImage from "../assets/smallBush.jpg";
import WoodpostImage from "../assets/Woodpost.jpg";

function NaturalBurial() {
  const [speakingText, setSpeakingText] = useState(""); // Track which text is currently being spoken

  /**
   * Handles text-to-speech functionality.
   * Toggles speech synthesis for the provided text.
   *
   * @author Raish Raj Joshi
   *
   * @param {string} text - Text to be spoken.
   */
  const handleSpeakText = (text) => {
    if (speakingText === text) {
      // Pause if the same text is being spoken
      window.speechSynthesis.pause();
      window.speechSynthesis.cancel(); // Stop any ongoing speech immediately
      setSpeakingText(""); // Reset the speaking text
    } else {
      // Stop current speech and start new text
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-CA";

      utterance.onend = () => {
        setSpeakingText(""); // Reset after speaking
      };

      window.speechSynthesis.speak(utterance);
      setSpeakingText(text); // Update speaking text
    }
  };

  // State to track visibility of sections
  const [isNaturalInView, setIsNaturalInView] = useState(false);
  const [isBurialOptionsInView, setIsBurialOptionsInView] = useState(false);
  const [isMarkerOptionsInView, setIsMarkerOptionsInView] = useState(false);

  // Refs for each section
  const naturalBurialRef = useRef(null);
  const burialOptionsRef = useRef(null);
  const markerOptionsRef = useRef(null);

  // Use IntersectionObserver to detect when Natural Burial is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNaturalInView(entry.isIntersecting); // Update visibility state
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    );

    const currentNaturalBurialRef = naturalBurialRef.current;
    if (currentNaturalBurialRef) {
      observer.observe(currentNaturalBurialRef); // Observe the section
    }

    return () => {
      if (currentNaturalBurialRef) {
        observer.unobserve(currentNaturalBurialRef); // Clean up observer
      }
    };
  }, []);

  // Use IntersectionObserver to detect when Burial Options is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBurialOptionsInView(entry.isIntersecting); // Update visibility state
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    );

    const currentBurialOptionsRef = burialOptionsRef.current;
    if (currentBurialOptionsRef) {
      observer.observe(currentBurialOptionsRef); // Observe the section
    }

    return () => {
      if (currentBurialOptionsRef) {
        observer.unobserve(currentBurialOptionsRef); // Clean up observer
      }
    };
  }, []);

  // Use IntersectionObserver to detect when Marker Options is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsMarkerOptionsInView(entry.isIntersecting); // Update visibility state
      },
      {
        threshold: 0.3, // Trigger when 50% of the section is visible
      }
    );

    const currentMarkerOptionsRef = markerOptionsRef.current;
    if (currentMarkerOptionsRef) {
      observer.observe(currentMarkerOptionsRef); // Observe the section
    }

    return () => {
      if (currentMarkerOptionsRef) {
        observer.unobserve(currentMarkerOptionsRef); // Clean up observer
      }
    };
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-200 via-green-300 to-green-400 min-h-screen overflow-x-hidden">
      {/* Full Page Background Section for Natural Burial */}
      <div
        ref={naturalBurialRef}
        className={`relative bg-cover bg-center h-screen text-white flex flex-col justify-center items-center transition-opacity duration-1000 ease-in-out ${
          isNaturalInView ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: `url(${firstpic})` }} // Full-page background image for Natural Burial
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        {/* Title and Description of Natural Burial */}
        <div className="relative z-10 text-center p-6 max-w-4xl">
          <h1 className="text-6xl font-extrabold text-shadow-lg mb-6">
            Natural Burial
          </h1>

          <p className="text-3xl leading-loose">
            <button
              onClick={() =>
                handleSpeakText(
                  "Natural burial is an eco-friendly approach to burial where the body is returned to the earth with minimal environmental impact, using biodegradable materials and without harmful chemicals."
                )
              }
              className="mr-4 p-2 bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
              aria-label="Read out loud"
            >
              {speakingText ===
              "Natural burial is an eco-friendly approach to burial where the body is returned to the earth with minimal environmental impact, using biodegradable materials and without harmful chemicals." ? (
                <FaPause className="text-xl" />
              ) : (
                <FaVolumeUp className="text-xl" />
              )}
            </button>
            Natural burial is an eco-friendly approach to burial where the body
            is returned to the earth with minimal environmental impact, using
            biodegradable materials and without harmful chemicals.
          </p>
        </div>
      </div>

      {/* Burial Options Section with Full Page Background */}
      <div
        ref={burialOptionsRef}
        className={`relative bg-cover bg-center min-h-screen transition-opacity duration-1000 ease-in-out ${
          isBurialOptionsInView ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: `url(${burialOptionImage})` }} // Full-page background image for Burial Options
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        {/* Burial Options Header */}
        <h2 className="text-5xl font-bold text-white mb-8 relative z-10 text-center translate-y-10">
          Burial Options
        </h2>
        <p className="text-4xl text-white mb-6 relative z-10 text-center translate-y-5">
          Here are some natural burial options:
        </p>

        <div className="flex flex-col h-[1000px] sm:h-fit gap-40 sm:gap-0 px-[40px]">
          {/* Burial Option 1: Pinebox */}
          <div className="flex flex-col justify-center items-center space-y-4 mb-4 relative z-10 sm:translate-x-[-17%] translate-y-16">
            <img
              src={pineboxImage}
              alt="Pinebox"
              className="w-80 h-80 rounded-full shadow-lg"
            />
            <h3 className="text-4xl font-semibold text-white">Pinebox</h3>

            <p className="text-2xl text-white">
              <button
                onClick={() =>
                  handleSpeakText(
                    "A biodegradable pine box with no non-biodegradable materials."
                  )
                }
                className="mr-4 p-2 bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
                aria-label="Read out loud"
              >
                {speakingText ===
                "A biodegradable pine box with no non-biodegradable materials." ? (
                  <FaPause className="text-xl" />
                ) : (
                  <FaVolumeUp className="text-xl" />
                )}
              </button>
              <p className="text-[25px] sm:text-2xl">
                A biodegradable pine box with no <br /> non-biodegradable
                materials.
              </p>
            </p>
          </div>
          {/* Burial Option 2: Shroud */}
          <div className="flex flex-col items-center space-y-4 relative z-10 sm:translate-x-[20%] -translate-y-16">
            <img
              src={shroudImage}
              alt="Shroud"
              className="w-50 h-50 rounded-full shadow-lg"
            />
            <h3 className="text-4xl font-semibold text-white">Shroud</h3>
            <p className="text-[25px] sm:text-2xl text-white pr-[20px]">
              A simple biodegradable cloth shroud.&nbsp;
            </p>
            <button
              onClick={() =>
                handleSpeakText("A simple biodegradable cloth shroud.")
              }
              className="mr-4 p-2 bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
              aria-label="Read out loud"
            >
              {speakingText === "A simple biodegradable cloth shroud." ? (
                <FaPause className="text-xl" />
              ) : (
                <FaVolumeUp className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Marker Options Section with Full Page Background Image */}
      <div
        ref={markerOptionsRef}
        className={`relative bg-cover bg-center min-h-screen p-6 transition-opacity duration-1000 ease-in-out ${
          isMarkerOptionsInView ? "opacity-100" : "opacity-0"
        } filter contrast-100`}
        style={{ backgroundImage: `url(${backGmarker})` }} // Full-page background image for Marker Options
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30 "></div>

        {/* Marker Options Content */}
        <div className="relative z-10">
          {/* Marker Options Header */}
          <h2 className="text-6xl font-bold text-white mb-4 relative z-10 text-center translate-y-8">
            Marker Options
          </h2>
          <p className="text-4xl text-white mb-6 relative z-10 text-center translate-y-4">
            Here are some marker options for natural burials:
          </p>

          {/* Options Container with Flexbox */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-x-8 mt-16 text-white">
            {/* Marker Option 1: Small Bush */}
            <div className="flex flex-col items-center text-center">
              <p className="text-white text-5xl font-semibold mt-4 translate-y-12">
                Small Bush
              </p>

              {/* Small Bush Image */}
              <img
                src={smallBushImage}
                alt="Small Bush"
                className="w-72 h-72 object-cover mt-14 rounded"
              />

              <p className="text-white text-2xl mt-2">
                A small bush or shrub can be planted to mark the burial site.
              </p>

              <button
                onClick={() =>
                  handleSpeakText(
                    " A small bush or shrub can be planted to mark the burial site."
                  )
                }
                className="mr-4 p-2 bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
                aria-label="Read out loud"
              >
                {speakingText ===
                " A small bush or shrub can be planted to mark the burial site." ? (
                  <FaPause className="text-xl" />
                ) : (
                  <FaVolumeUp className="text-xl" />
                )}
              </button>
            </div>

            {/* Marker Option 2: GPS Coordinate/ No Marker */}
            <div className="flex flex-col items-center text-center">
              <p className="text-white text-5xl font-semibold translate-y-12">
                GPS Coordinate
              </p>

              {/* GPS Image */}
              <img
                src={GPSImage}
                alt="GPS Coordinate"
                className="w-72 h-72 object-cover mt-16 rounded"
              />

              <p className="text-white text-2xl mt-4">
                The burial site can be identified by GPS coordinates, without a
                physical marker.
              </p>

              <button
                onClick={() =>
                  handleSpeakText(
                    " The burial site can be identified by GPS coordinates, without a physical marker."
                  )
                }
                className="mr-4 p-2 bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
                aria-label="Read out loud"
              >
                {speakingText ===
                " The burial site can be identified by GPS coordinates, without a physical marker." ? (
                  <FaPause className="text-xl" />
                ) : (
                  <FaVolumeUp className="text-xl" />
                )}
              </button>
            </div>

            {/* Marker Option 3: Biodegradable Wood Post */}
            <div className="flex flex-col items-center">
              <p className="text-white text-5xl font-semibold translate-y-12">
                Biodegradable Wood Post
              </p>

              <img
                src={WoodpostImage}
                alt="GPS Coordinate"
                className="w-72 h-72 object-cover mt-16 rounded"
              />

              <p className="text-white text-2xl text-center mt-2">
                A small, biodegradable wood post can be used as a marker.
              </p>

              <button
                onClick={() =>
                  handleSpeakText(
                    "A small, biodegradable wood post can be used as a marker."
                  )
                }
                className="mr-4 p-2 bg-transparent text-blue-500 hover:text-blue-700 rounded-full shadow-lg hover:bg-light-primary transition-all duration-300"
                aria-label="Read out loud"
              >
                {speakingText ===
                "A small, biodegradable wood post can be used as a marker." ? (
                  <FaPause className="text-xl" />
                ) : (
                  <FaVolumeUp className="text-xl" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NaturalBurial;
