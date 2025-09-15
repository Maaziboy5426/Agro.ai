import React, { useState, useEffect } from 'react';
import './Home.css'; // Import CSS

const Home = () => {
  const galleryItems = [
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJd6srnaSlB5jbAFHTBIjlRBEF2QSejh5IJA&s",
      caption: "Agriculture is the most healthful, most useful, and most noble employement of man.-George Washington",
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0UxowmmisT2CKJo5gzCmqYH7CEawFrb7ddw&s",
      caption: "The Farmer has to be an optimist or he wouldn't still be a farmer.-Will Rogers",
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU-G5f0wa_t0licd0i2Nxk34UEHXtXJFf5vQ&s",
      caption: "In every gardener, ther is a child who believes in The Seed Fairy"
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSamTOq-K28abyJeYAko7_UyRPWdqAnVmrgUA&s",
      caption: "To a farmer, dirt is not a waste, it's potential."
    },
    {
      image: "https://tse4.mm.bing.net/th?id=OIP.qB_pXl1pR3DrnF_3JsDVuQHaE8&pid=Api&P=0&h=220",
      caption: "The farmer is the only man in our economy who buys everything at retail and sell everything at wholesale, and pays the freight both ways.-John F. Kennedy",
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryItems.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <section className="gallery">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h2>Gallery</h2>
        <div className="gallery-images">


          <div className="image-container">
            <img
              src={galleryItems[currentIndex].image}
              alt={`Plant ${currentIndex + 1}`}
              className="gallery-image"
            />
            <p className="image-caption">{galleryItems[currentIndex].caption}</p>
          </div>


        </div>
      </section>

      <section className="features">
        <h2>Features</h2>
        <ul>
          <li>Search for various plants and their requirements.</li>
          <li>Get tips on plant care and maintenance.</li>
          <li>Explore a gallery of beautiful plants.</li>
          <li>Join our community of gardening enthusiasts.</li>
        </ul>
      </section>

      <section className="about">
        <h2>About Us</h2>
        <p>
          We are passionate about plants and gardening. Our mission is to provide
          you with the best resources and community support to help you grow
          your gardening skills and knowledge.
        </p>
      </section>

      <footer className="home-footer">
        <p>&copy; 2025 Gardening App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
