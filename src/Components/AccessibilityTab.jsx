import React, { useEffect, useState } from "react";

const AccessibilityTab = () => {
  const [textSize, setTextSize] = useState(localStorage.getItem("textSize") || "medium");
  const [font, setFont] = useState(localStorage.getItem("font") || "default");
  const [contrast, setContrast] = useState(localStorage.getItem("contrast") || "default");

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("text-small", "text-medium", "text-large");
    html.classList.add(`text-${textSize}`);
    html.classList.remove("font-default", "font-opendyslexic");
    html.classList.add(`font-${font}`);
    html.classList.remove("contrast-default", "contrast-dark", "contrast-light", "contrast-inverted");
    html.classList.add(`contrast-${contrast}`);

    localStorage.setItem("textSize", textSize);
    localStorage.setItem("font", font);
    localStorage.setItem("contrast", contrast);
  }, [textSize, font, contrast]);

  return (
    <div className="fixed bottom-20 right-4 p-4 bg-white shadow-lg rounded-lg z-50 w-64">
      <h3 className="font-bold mb-2">Accessibility Settings</h3>

      {/* Text Size */}
      <label className="block mb-1">Text Size:</label>
      <select value={textSize} onChange={(e) => setTextSize(e.target.value)} className="mb-2 border rounded p-1 w-full">
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>

      {/* Font */}
      <label className="block mb-1">Font Style:</label>
      <select value={font} onChange={(e) => setFont(e.target.value)} className="mb-2 border rounded p-1 w-full">
        <option value="default">Default</option>
        <option value="opendyslexic">Dyslexia-Friendly</option>
        
      </select>

      {/* Contrast */}
      <label className="block mb-1">Contrast:</label>
      <select value={contrast} onChange={(e) => setContrast(e.target.value)} className="mb-2 border rounded p-1 w-full">
        <option value="default">Default</option>
        <option value="dark">Dark Mode</option>
        <option value="light">Light Mode</option>
        <option value="inverted">Inverted</option>
      </select>
    </div>
  );
};

export default AccessibilityTab;
