/**
 * Purpose: React component containing functionality and styles(Tailwind) for the About Page of the website, including a Text-to-Speech feature for the page's textual content.
 * @author Tania Terence
 */


/**
 * About component
 * @returns the About page as a JSX Element.
 */
const About = () => {
  
  return (
    <div>

      {/*
      *Audio Player embed code for Text-to-Speech feature
      * Source credit: Murf AI Voice Generator (Web Version) - "https://murf.ai/"
      *Author: Tania Terence
      */}
      <iframe className="murf-embed w-full" height="102"  src="https://murf.ai/embeds/index.html?embedId=m4na2n49"  allowfullscreen title="Murf Embed Player" style={{border: 'none'}}></iframe>
      <script src="https://murf.ai/embeds/widget.js" ></script>

      {/*Snap Effect when scrolling*/}
      <div className="snap-y snap-mandatory overflow-y-scroll h-screen">

        {/*About Section*/}
        <section className="relative h-screen snap-start">

          {/*
          * Background image for About section
          * Image source credit: https://www.pexels.com/
          */}
          <div className="absolute inset-0">
            <img
              className="absolute object-cover h-screen w-full"
              src="fern-leaves.jpg"
              alt="Background Image"
            />
          </div>

          {/*Text content (About) and background overlay*/}
          <div className="absolute flex flex-col items-center justify-center h-screen bg-gray-900 bg-opacity-[0.6] dark:bg-opacity-[0.7]">
            <div className="text-center text-black bg-[#567c3a] bg-opacity-[0.58] py-[25px] dark:bg-opacity-0 dark:text-[#ffffe8]">
              <h1 className="text-[25px] sm:text-[35px]">
                <b>ABOUT </b>
              </h1>
              <br />
              <p className="text-[16.5px] font-medium sm:text-[21px] px-[25px] sm:px-[280px]">
                Nestled in the heart of Halifax, Nova Scotia, the St. Margaret’s
                Bay Area Woodland Conservation Site is a sanctuary of natural
                beauty and biodiversity. Spanning an impressive 200 acres, this
                conservation area is a verdant tapestry of towering trees, lush
                undergrowth, and vibrant wildlife. The woodland is home to a
                diverse range of flora and fauna, including the majestic Red
                Maple, the delicate Wild Carrot, and the robust Coltsfoot. The
                Sheep Laurel and Multiflora Rose add a splash of color to the
                landscape, while the Star-nose Mole and the Little Brown Bat
                represent some of the unique wildlife species that inhabit the
                area. The St. Margaret’s Bay Area Woodland Conservation Site is
                not just a haven for wildlife, but also a living testament to our
                natural heritage. It is a place where the past meets the present,
                where the whispering winds carry stories of times long gone, and
                where every leaf and stone is a piece of history waiting to be
                discovered.
              </p>
            </div>
          </div>
        </section>

        {/*Vision Section*/}
        <section className="relative h-screen snap-start">

          {/*
          * Background image for Vision section
          * Image source credit: https://www.inaturalist.org/
          */}
          <div className="absolute inset-0">
            <img
              className="absolute object-cover h-screen w-full"
              src="red-maple.jpg"
              alt="Background Image"
            />
          </div>

          {/*Text content (Vision) and background overlay*/}
          <div className="absolute flex flex-col items-center justify-center h-screen bg-gray-900 bg-opacity-[0.4] dark:bg-opacity-[0.7]">
            <div className="text-center text-black py-[30px] bg-[#823d37] bg-opacity-[0.75] py-[25px] dark:bg-opacity-0 dark:text-[#ffffe8]">
              <h1 data-cy="vision-heading" className="text-[25px] sm:text-[35px]">
                <b>OUR VISION </b>
              </h1>
              <br />
              <p className="text-[18px] font-medium sm:text-[21px] px-[20px] sm:px-[250px]">
                We envision the St. Margaret’s Bay Area Woodland Conservation Site
                as a thriving ecosystem, teeming with life and serving as a model
                for conservation efforts. We strive to create a space where nature
                can flourish, where future generations can experience the wonder
                of the woodland, and where the legacy of our natural heritage is
                safeguarded for years to come.
              </p>
            </div>
          </div>
        </section>

        {/*Mission Section*/}
        <section className="relative h-screen snap-start">

          {/*
          * Background image for Mission section
          * Image source credit: https://www.inaturalist.org/
          */}
          <div className="absolute inset-0">
            <img
              className="absolute object-cover h-screen w-full"
              src="ferns.jpg"
              alt="Background Image"
            />
          </div>

          {/*Text content (Mission) and overlay*/}
          <div className="absolute flex flex-col items-center justify-center h-screen bg-gray-900 bg-opacity-[0.5] dark:bg-opacity-[0.7]">
            <div className="text-center text-black py-[30px] bg-[#5c7335] bg-opacity-[0.7] py-[25px] dark:bg-opacity-0 dark:text-[#ffffe8]">
              <h1
                data-cy="mission-heading"
                className="text-[25px] sm:text-[35px]"
              >
                <b>OUR MISSION </b>
      
              </h1>
              <br />
              <p className="text-[18px] font-medium sm:text-[21px] px-[20px] sm:px-[250px]">
                Our mission is to preserve and enhance the ecological integrity of
                the St. Margaret’s Bay Area Woodland Conservation Site. We are
                committed to protecting its diverse habitats, promoting
                sustainable use, and fostering an appreciation for our natural
                heritage through education and community engagement.
              </p>
            </div>
          </div>

        </section>

      </div>

    </div>
  );
};

export default About;


