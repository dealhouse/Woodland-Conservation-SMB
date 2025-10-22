import './NaturalBurial.css';
import burialImage from '../assets/use.png';
import coffinImage from '../assets/coffin.png';  
import markerImage from '../assets/Marker.png'; 
import gpsImage from '../assets/Gps.Png';      
import React, { useState, useEffect } from 'react'; 
import { FaVolumeUp, FaPause } from 'react-icons/fa'

const NaturalBurial = () => {
  const [speakingText, setSpeakingText] = useState("");
  
  // Load voices when component mounts
  useEffect(() => {
    const loadVoices = () => {
      // This ensures voices are loaded
      window.speechSynthesis.getVoices();
    };
    
    loadVoices();
    // Some browsers need this event listener
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  /**
   * Handles text-to-speech functionality.
   * Toggles speech synthesis for the provided text.
   */
  const handleSpeakText = (text) => {
    if (speakingText === text) {
      // Pause if the same text is being spoken
      window.speechSynthesis.cancel(); // Stop any ongoing speech immediately
      setSpeakingText(""); // Reset the speaking text
      return;
    }

    // Stop current speech and start new text
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    
    // Find a standard English voice
    const standardVoice = voices.find((voice) =>
      voice.lang === "en-CA" //|| voice.lang === "en-GB" || voice.lang === "en"
    );

    if (standardVoice) {
      utterance.voice = standardVoice;
    }
    
    // Most natural settings for standard voice
    utterance.rate = 0.95;    // Normal speed
    utterance.pitch = 1.05;   // Normal pitch
    utterance.volume = 1.0;  // Normal volume
    utterance.lang = "en-US"; // Standard US English
    
    // Add event listeners
    utterance.onend = () => {
      setSpeakingText("");
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setSpeakingText("");
    };

    window.speechSynthesis.speak(utterance);
    setSpeakingText(text); // Update speaking text
  };

  return (
    <div className="natural-burial">
      <img 
        src={burialImage} 
        alt="A burial mound covered in wildflowers and moss in a forest clearing"
        className="header-image" 
      />

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <section className="description-section">
            <div className="description-header"> 
              <h2>Description of Natural burial</h2>
              {/* Sound icon button */}
              <button
                onClick={() =>
                  handleSpeakText(
                    "Natural burial is an eco-friendly alternative to conventional burial methods that emphasizes the conservation of natural resources and the reduction of environmental impact. This practice involves the interment of the body in a biodegradable coffin, shroud, or directly in the soil, without the use of embalming fluids or non-biodegradable materials."
                  )
                }
                className="sound-button"
                aria-label="Read description out loud"
                title="Listen to description"
              >
                {speakingText === "Natural burial is an eco-friendly alternative to conventional burial methods that emphasizes the conservation of natural resources and the reduction of environmental impact. This practice involves the interment of the body in a biodegradable coffin, shroud, or directly in the soil, without the use of embalming fluids or non-biodegradable materials." ? (
                  <FaPause className="icon" />
                ) : (
                  <FaVolumeUp className="icon" />
                )}
              </button>
            </div>
            <p> 
              Natural burial is an eco-friendly alternative to conventional burial methods
              that emphasizes the conservation of natural resources and the reduction
              of environmental impact. This practice involves the interment of the
              body in a biodegradable coffin, shroud, or directly in the soil, without a use
              of embalming fluids or non-biodegradable materials.
            </p>
          </section>

          <section className="info-sections">
            <div className="info-card">
              <img 
                src={coffinImage} 
                alt="A simple wooden coffin on grass" 
                className="card-image" 
              />
              <button 
                onClick={() => handleSpeakText("Kinds of burial include biodegradable coffins made from natural materials like wood or bamboo, burial shrouds made from natural fibers, and direct earth burial where the body is placed directly in contact with the soil.")}
                className="sound-button small"
              >
                {speakingText === "Kinds of burial include biodegradable coffins made from natural materials like wood or bamboo, burial shrouds made from natural fibers, and direct earth burial where the body is placed directly in contact with the soil." ? (
                  <FaPause className="icon" />
                ) : (
                  <FaVolumeUp className="icon" />
                )}
              </button>
              <h3>Types of Burial</h3>
              <p>Biodegradable coffins, shrouds, and natural burial options</p>
              <button>Learn more</button>

            </div>
            
            <div className="info-card">
              <img 
                src={markerImage} 
                alt="A wooden heart-shaped grave marker" 
                className="card-image" 
              />
              <button 
                onClick={() => handleSpeakText("Burial markers in natural burials use environmentally friendly options like native trees, shrubs, natural stones, wooden posts, or GPS coordinates instead of traditional headstones made from non-biodegradable materials.")}
                className="sound-button small"
              >
                {speakingText === "Burial markers in natural burials use environmentally friendly options like native trees, shrubs, natural stones, wooden posts, or GPS coordinates instead of traditional headstones made from non-biodegradable materials." ? (
                  <FaPause className="icon" />
                ) : (
                  <FaVolumeUp className="icon" />
                )}
              </button>
              <h3>🌿 Burial Markers</h3>
              <p>Natural markers like trees, stones, or plants</p>
              
              <button>Learn more</button>
            </div>
            
            <div className="info-card">
              <img 
                src={gpsImage} 
                alt="A handheld GPS device marking a burial location" 
                className="card-image" 
              />
              <button 
                onClick={() => handleSpeakText("Natural burials take place in designated natural burial grounds, conservation areas, woodlands, meadows, or green cemeteries that are specifically dedicated to environmentally friendly burial practices and habitat preservation.")}
                className="sound-button small"
              >
                {speakingText === "Natural burials take place in designated natural burial grounds, conservation areas, woodlands, meadows, or green cemeteries that are specifically dedicated to environmentally friendly burial practices and habitat preservation." ? (
                  <FaPause className="icon" />
                ) : (
                  <FaVolumeUp className="icon" />
                )}
              </button>
              <h3>📍 Burial Locations</h3>
              <p>Natural burial grounds and conservation areas</p>
              
              <button>Learn more</button>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Woodland Conservation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default NaturalBurial;