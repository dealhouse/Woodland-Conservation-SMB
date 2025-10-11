/*A React component that uses tailwind css containing a parallax gallery which
 * also includes an add image section.
 *
 *@author Aaron Jayawardana
 *
 * */
import React, { useState } from 'react';
import './Gallery.css';  // Custom CSS since no tailwind support for Parallax

// Import images for the parallax section
// Image source: https://stock.adobe.com/ca
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';


function Gallery() {
  const [images, setImages] = useState([]);  // Stores the uploaded images

  /*
   *Purpose: Reads the selected file, converts it to a Data URL, and adds it to the gallery.
   *
   *@param {Event} event - The file input change event triggered by the user.
   * */
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => [...prevImages, reader.result]);  // Adds the new image to the gallery
      };
      reader.readAsDataURL(file);  // Reads the file as a data URL
    }
  };

  /*
   *Purpose: Displays a parallax gallery with hardcoded images and a user-uploadable image section.
   * 
   * */
  return (
    <div className="Gallery">
      {/* Parallax image 1 */}
      <div className="parallax-container" style={{ backgroundImage: `url(${image1})` }}>
        <div className="parallax-content">
          <h1 className="parallax-heading text-5xl font-bold text-white text-shadow-lg">Gallery</h1>
        </div>
      </div>

      {/* Parallax image 2 */}
      <div className="parallax-container" style={{ backgroundImage: `url(${image2})` }}>
        <div className="parallax-content">
        </div>
      </div>

      {/* Parallax image 3 */}
      <div className="parallax-container" style={{ backgroundImage: `url(${image3})` }}>
        <div className="parallax-content">
        </div>
      </div>

      {/* Parallax image 4 */}
      <div className="parallax-container" style={{ backgroundImage: `url(${image4})` }}>
        <div className="parallax-content">
        </div>
      </div>

      {/* Add Image Section */}
      <section className="bg-gray-900 text-white p-8 text-center">
        <h2 className="text-3xl font-semibold mb-4">Add Your Own Image</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="bg-gray-700 text-white px-4 py-2 rounded cursor-pointer"
        />
      </section>

      {/* Gallery Section */}
      <section className="bg-gray-100 p-8">
        <h2 className="text-3xl font-semibold mb-4 text-center">Uploaded Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Displays the uploaded images */}
          {images.map((image, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-lg bg-white p-4">
              <img
                src={image}
                alt={`Uploaded ${index}`}
                className="w-full h-auto rounded-lg transition-all duration-300 transform hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Gallery;

