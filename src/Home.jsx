/**
 * @file Home.js
 * @description Home Page for the Woodland Conservation Site with H1–H4 requirements.
 */

import React, { useEffect, useState } from "react";
import { FaVolumeUp, FaPause, FaSun, FaMoon, FaMapMarkerAlt } from "react-icons/fa";
import image from "../assets/Light BG Image.jpg";

/* ----------------------------- Theme helpers ----------------------------- */
// Persist for ~1 year
const THEME_KEY = "wc_theme_pref";
const YEAR_MS = 365 * 24 * 60 * 60 * 1000;

function getStoredTheme() {
  try {
    const raw = localStorage.getItem(THEME_KEY);
    if (!raw) return null;
    const { theme, ts } = JSON.parse(raw);
    if (!theme || !ts || Date.now() - ts > YEAR_MS) return null;
    return theme; // "light" | "dark"
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
  const root = document.documentElement; // Tailwind dark mode via class
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

/* --------------------------- Weather (H4) widget -------------------------- */
/**
 * A tiny weather widget using Open-Meteo (no API key).
 * - Default coordinates point at a woodland fallback.
 * - "Use my location" button asks for geolocation permission.
 * - Graceful error handling shows a simple fallback state.
 */
function WeatherWidget() {
  const DEFAULT = { lat: 44.6511, lon: -63.5820, label: "Local woodland" }; // Halifax-ish fallback
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coords.lat, coords.lon]);

  const requestLocation = () => {
    if (!("geolocation" in navigator)) {
      setErr("Geolocation not supported; using fallback.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          label: "Your location",
        });
      },
      () => {
        setErr("Permission denied; using fallback.");
      },
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

/* ---------------------------------- Home --------------------------------- */
export default function Home() {
  // Text-to-speech (existing)
  const [speakingText, setSpeakingText] = useState("");

  // Theme (H2): init from stored pref or system setting, then persist
  const [theme, setTheme] = useState(() => {
    const stored = getStoredTheme();
    if (stored) return stored;
    // system preference as first-run default
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    applyTheme(theme);
    storeTheme(theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // TTS handler (existing)
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
      {/* ============================= [H1] NAV ============================= */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-black/10 dark:border-white/10">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* <a href="/" className="font-semibold tracking-wide">
            Woodland
          </a>
          <ul className="hidden md:flex items-center gap-6 text-sm">
            <li><a href="/" className="hover:opacity-70">Home</a></li>
            <li><a href="/about" className="hover:opacity-70">About</a></li>
            <li><a href="/ecosystem" className="hover:opacity-70">Ecosystem</a></li>
            <li><a href="/gallery" className="hover:opacity-70">Gallery</a></li>
            <li><a href="/map" className="hover:opacity-70">Map</a></li>
            <li><a href="/contact" className="hover:opacity-70">Contact</a></li>
          </ul>
          <button
            onClick={toggleTheme}
            aria-label="Toggle light and dark mode"
            className="ml-4 inline-flex items-center gap-2 rounded-md border border-black/10 dark:border-white/20 px-3 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/10 transition"
            title="Light/Dark"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
            <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
          </button> */}
        </nav>
      </header>

      {/* Murf AI Embed (kept) */}
      <iframe
        className="murf-embed w-full"
        height="102"
        src="https://murf.ai/embeds/index.html?embedId=m4nccss4"
        allowFullScreen
        title="Murf Embed Player"
        style={{ border: "none" }}
      ></iframe>
      <script src="https://murf.ai/embeds/widget.js"></script>

      {/* ============================ [H3] HERO ============================ */}
      <div
        className="relative w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-6 py-12 mx-auto max-w-7xl">
          {/* Left: text */}
          <div className="w-full lg:w-1/2 text-left text-white">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4 flex flex-col">
              Welcome to the{" "}
              <span className="text-light-primary dark:text-dark-primary">
                Woodland Conservation Site
              </span>
            </h1>
            <p className="text-lg lg:text-2xl max-w-3xl mx-auto flex items-start">
              <button
                onClick={() =>
                  handleSpeakText(
                    "Explore the serenity of nature and contribute to preserving the delicate balance of our ecosystem. Learn how to protect wildlife, engage in sustainable practices, and celebrate the beauty of our natural world."
                  )
                }
                className="mr-4 mt-1 p-2 bg-transparent text-blue-300 hover:text-white rounded-full shadow-lg hover:bg-white/10 transition"
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
          {/* Right: image */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <img
              src={image}
              alt="Woodland Conservation"
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* ============================ [H4] WEATHER ============================ */}
      <WeatherWidget />

      {/* ======================== Existing Page Content ======================= */}
      <div className="px-4 py-10 lg:px-20">
        <h2 className="text-3xl font-semibold mb-6 text-center">What We Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Conservation Projects Card */}
          <div className="bg-light-background text-black dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-4">Conservation Projects</h3>
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
              Learn about eco-friendly practices that help reduce our carbon
              footprint and contribute to a greener planet.
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
              We are committed to protecting endangered species and restoring
              biodiversity to our natural surroundings.
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