/**
 * Purpose: React About Page that satisfies IDs 401–410.
 * - Tailwind styling only (no external CSS)
 * - Web Speech API for TTS + Spacebar play/pause
 * - Image audio button (plays short recording, falls back to TTS)
 * NOTE: Place optional audio files in /public/audio (<= 2 minutes).
 */

import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  {
    id: "about",
    title: "About Us",
    // ID 404: grade ~7 reading level—short, clear sentences.
    text:
      "We care for the woodlands around St. Margaret’s Bay. We work with neighbours to protect trees, clean water, and wildlife. We share simple steps that anyone can take to help nature.",
    imgSrc: "fern-leaves.jpg",
    imgAlt: "Green fern leaves in a shaded woodland",
    audioDescSrc: "/audio/about-desc.mp3", // optional real file (<= 2 min)
    ttsImageFallback:
      "Photo of green fern leaves growing in a shaded woodland near St. Margaret’s Bay."
  },
  {
    id: "mission",
    title: "Mission",
    text:
      "Our mission is to protect local habitats and support a healthy forest. We plant trees, remove waste, and invite people to join events. Small actions add up when we work together.",
    imgSrc: "ferns.jpg",
    imgAlt: "Volunteers planting small trees along a trail",
    audioDescSrc: "/audio/mission-desc.mp3",
    ttsImageFallback:
      "Photo of volunteers planting small trees along a trail. They wear gloves and use small shovels."
  },
  {
    id: "vision",
    title: "Vision",
    text:
      "We see a future where our woodlands thrive. Trails are safe, streams run clean, and animals have space to live. Families can learn and enjoy nature for many years.",
    imgSrc: "red-maple.jpg",
    imgAlt: "Red maple leaves in sunlight",
    audioDescSrc: "/audio/vision-desc.mp3",
    ttsImageFallback:
      "Photo of red maple leaves lit by sunlight with forest in the background."
  }
];

const btnBase =
  "inline-flex items-center gap-2 rounded-lg px-3 py-2 font-semibold " +
  "border focus:outline-none focus-visible:ring-4 " +
  "transition-colors " +
  // ID 410: medium brightness + high contrast in both themes
  "bg-neutral-200 text-neutral-900 border-neutral-500 " +
  "hover:bg-neutral-300 hover:border-neutral-700 " +
  "dark:bg-neutral-700 dark:text-white dark:border-neutral-300 " +
  "dark:hover:bg-neutral-600 dark:hover:border-white " +
  "focus-visible:ring-blue-400/60 dark:focus-visible:ring-blue-300/60";

export default function About() {
  const [activeId, setActiveId] = useState(null);
  const speechRef = useRef({ utter: null, speakingFor: null });

  // ID 406: Space toggles play/pause of active TTS
  useEffect(() => {
    const onKey = (e) => {
      if (e.code !== "Space") return;
      e.preventDefault();
      const synth = window.speechSynthesis;
      if (!synth || !speechRef.current.utter) return;

      if (synth.speaking && !synth.paused) synth.pause();
      else if (synth.paused) synth.resume();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    // stop TTS when unmounting
    return () => window.speechSynthesis?.cancel();
  }, []);

  const speak = (sectionId, text) => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-CA";
    utter.rate = 1.0; // clear/steady for accessibility
    utter.onend = () => {
      speechRef.current.utter = null;
      speechRef.current.speakingFor = null;
      setActiveId(null);
    };

    speechRef.current.utter = utter;
    speechRef.current.speakingFor = sectionId;
    setActiveId(sectionId);
    synth.speak(utter);
  };

  const handleReadAloud = (sectionId, text) => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    if (speechRef.current.speakingFor === sectionId) {
      if (synth.speaking && !synth.paused) synth.pause();
      else if (synth.paused) synth.resume();
      else speak(sectionId, text);
      return;
    }
    speak(sectionId, text);
  };

  const playImageAudio = async (sec) => {
    // Prefer recorded audio if provided (ID 407)
    if (sec.audioDescSrc) {
      const a = new Audio(sec.audioDescSrc);
      a.play().catch(() => speak(`${sec.id}-image`, sec.ttsImageFallback));
      return;
    }
    // Fallback: use short TTS description
    speak(`${sec.id}-image`, sec.ttsImageFallback);
  };

  return (
    <main
      className={
        // ID 403: Calibri + single line-height, black in light, pale yellow in dark
        "min-h-screen px-4 py-6 sm:px-6 lg:px-8 " +
        "text-black dark:text-yellow-100 " +
        "font-[Calibri] leading-[1.0]"
      }
      aria-labelledby="about-title"
    >
      {/* ID 401: Title bar */}
      <header className="border-b border-neutral-300 dark:border-neutral-700 mb-6 pb-3">
        <h1
          id="about-title"
          className="text-2xl sm:text-3xl font-bold text-center"
        >
          About St. Margaret’s Bay Woodland Conservation
        </h1>
      </header>

      {/* ID 402/408/405/407/410 */}
      <section className="mx-auto max-w-5xl space-y-4">
        {SECTIONS.map((sec) => (
          <article
            key={sec.id}
            className="grid grid-cols-1 md:grid-cols-[180px,1fr] gap-4 rounded-xl border border-neutral-300 dark:border-neutral-700 p-4"
          >
            {/* Image + audio description (ID 407 & 408) */}
            <div className="flex flex-col items-start gap-2">
              <img
                src={sec.imgSrc}
                alt={sec.imgAlt}
                className="w-[180px] h-[130px] object-cover rounded-lg border border-neutral-300 dark:border-neutral-600"
              />
              <button
                className={btnBase}
                type="button"
                onClick={() => playImageAudio(sec)}
                aria-label={`Play audio description for ${sec.title} image`}
                title="Plays a short recording; falls back to TTS if missing"
              >
                🔊 Image Audio
              </button>
            </div>

            {/* Text + TTS (IDs 403–406, 410) */}
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">{sec.title}</h2>
              <p className="text-base">{sec.text}</p>

              <div className="flex items-center gap-3">
                <button
                  className={btnBase}
                  type="button"
                  aria-pressed={activeId === sec.id}
                  aria-label={`Play or pause reading for ${sec.title}`}
                  title="Spacebar will play/pause the active reading"
                  onClick={() => handleReadAloud(sec.id, sec.text)}
                >
                  🗣️ Read Aloud
                </button>
                <span className="text-sm opacity-90">
                  Press <kbd className="border px-1 rounded">Space</kbd> to
                  play/pause the active TTS
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* ID 409: Learn More button */}
      <div className="mt-6 flex justify-center">
        <a
          href="/learn-more"
          className={
            btnBase +
            " bg-blue-600 text-white border-blue-700 hover:bg-blue-700 dark:bg-blue-500 dark:border-blue-300 dark:hover:bg-blue-400"
          }
        >
          Learn More
        </a>
      </div>

      {/* Optional accessibility strip to mirror the mock */}
      <div className="mt-6 text-center text-sm opacity-90">
        Accessibility: WCAG AA; keyboard navigation; captions/TTS buttons
      </div>
    </main>
  );
}
