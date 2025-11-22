import React, { useEffect, useState } from "react";
import { FaVolumeUp, FaPause, FaSun, FaMoon, FaMapMarkerAlt } from "react-icons/fa";
import image from "../assets/Light BG Image.jpg";

// Persist for ~1 year
const THEME_KEY = "wc_theme_pref";
const YEAR_MS = 365 * 24 * 60 * 60 * 1000;

// Helper functions for theme management
function getStoredTheme() {
  try {
    const raw = localStorage.getItem(THEME_KEY);
    if (!raw) return null;
    const { theme, ts } = JSON.parse(raw);
    if (!theme || !ts || Date.now() - ts > YEAR_MS) return null;
    return theme;
  } catch {
    return null;
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, JSON.stringify({ theme, ts: Date.now() }));
  } catch {}
}

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

function WeatherWidget() {
  const DEFAULT = { lat: 44.6511, lon: -63.5820, label: "Local woodland" };
  const [coords, setCoords] = useState(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [data, setData] = useState(null);

  async function loadWeather(lat, lon) {
    try {
      setLoading(true);
      setErr("");
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&timezone=auto`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Weather unavailable");
      const json = await res.json();
      setData({
        temp: json?.current?.temperature_2m,
        wind: json?.current?.wind_speed_10m,
        tz: json?.timezone ?? "local",
      });
    } catch (e) {
      setErr("Weather unavailable. Showing fallback.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWeather(coords.lat, coords.lon);
  }, [coords.lat, coords.lon]);

  const requestLocation = () => {
    if (!("geolocation" in navigator)) {
      setErr("Geolocation not supported; using fallback.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude, label: "Your location" }),
      () => setErr("Permission denied; using fallback."),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-gray-800/60 backdrop-blur p-5">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <FaMapMarkerAlt className="opacity-80" />
            Weather — <span className="opacity-80">{coords.label}</span>
          </h3>
          <button
            onClick={requestLocation}
            className="text-sm px-3 py-1 rounded-md border border-black/10 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 transition"
          >
            Use my location
          </button>
        </div>

        <div className="mt-4 text-sm opacity-80">
          {loading && <p>Loading current conditions…</p>}
          {!loading && err && <p>{err}</p>}
          {!loading && !err && data && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-base">
              <div>
                <div className="text-xs opacity-60">Temperature</div>
                <div className="text-lg font-medium">{Math.round(data.temp)}°C</div>
              </div>
              <div>
                <div className="text-xs opacity-60">Wind</div>
                <div className="text-lg font-medium">{Math.round(data.wind)} km/h</div>
              </div>
              <div>
                <div className="text-xs opacity-60">Timezone</div>
                <div className="text-lg font-medium">{data.tz}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [speakingText, setSpeakingText] = useState("");
  const [theme, setTheme] = useState(() => {
    const stored = getStoredTheme();
    if (stored) return stored;
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    applyTheme(theme);
    storeTheme(theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const handleSpeakText = (text) => {
    if (speakingText === text) {
      window.speechSynthesis.pause();
      window.speechSynthesis.cancel();
      setSpeakingText("");
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-CA";
      utterance.onend = () => setSpeakingText("");
      window.speechSynthesis.speak(utterance);
      setSpeakingText(text);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="relative w-full bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-6 py-12 mx-auto max-w-7xl">
          <div className="w-full lg:w-1/2 text-left text-white">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4">
              Welcome to the <span className="text-light-primary dark:text-dark-primary">Woodland Conservation Site</span>
            </h1>
            <p className="text-lg lg:text-2xl max-w-3xl mx-auto">
              <button
                onClick={() =>
                  handleSpeakText("Explore the serenity of nature and contribute to preserving the delicate balance of our ecosystem.")
                }
                className="mr-4 mt-1 p-2 bg-transparent text-blue-300 hover:text-white rounded-full shadow-lg hover:bg-white/10 transition"
                aria-label="Read out loud"
              >
                {speakingText === "Explore the serenity of nature and contribute to preserving the delicate balance of our ecosystem." ? (
                  <FaPause className="text-xl" />
                ) : (
                  <FaVolumeUp className="text-xl" />
                )}
              </button>
              Explore the serenity of nature and contribute to preserving the delicate balance of our ecosystem.
            </p>
          </div>
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <img src={image} alt="Woodland Conservation" className="w-full h-auto rounded-lg shadow-xl" />
          </div>
        </div>
      </div>

      <WeatherWidget />

      {/* ===================== [What We Do Section] ===================== */}
      <div className="px-4 py-10 lg:px-20">
        <h2 className="text-3xl font-semibold mb-6 text-center">What We Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Conservation Projects Card */}
          <div className="bg-light-background text-black dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-4">Conservation Projects</h3>
            <p>
              We focus on preserving natural habitats and wildlife to ensure a healthy ecosystem for future generations.
            </p>
            <button
              onClick={() =>
                handleSpeakText(
                  "We focus on preserving natural habitats and wildlife to ensure a healthy ecosystem for future generations."
                )
              }
              className="mt-3 p-2 bg-transparent text-blue-500 rounded-full shadow-lg hover:bg-light-primary transition"
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
          <div className="bg-light-background text-black dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-4">Sustainable Practices</h3>
            <p>
              Learn about eco-friendly practices that help reduce our carbon footprint and contribute to a greener planet.
            </p>
            <button
              onClick={() =>
                handleSpeakText(
                  "Learn about eco-friendly practices that help reduce our carbon footprint and contribute to a greener planet."
                )
              }
              className="mt-3 p-2 bg-transparent text-blue-500 rounded-full shadow-lg hover:bg-light-primary transition"
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
          <div className="bg-light-background text-black dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-4">Wildlife Protection</h3>
            <p>
              We are committed to protecting endangered species and restoring biodiversity to our natural surroundings.
            </p>
            <button
              onClick={() =>
                handleSpeakText(
                  "We are committed to protecting endangered species and restoring biodiversity to our natural surroundings."
                )
              }
              className="mt-3 p-2 bg-transparent text-blue-500 rounded-full shadow-lg hover:bg-light-primary transition"
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
