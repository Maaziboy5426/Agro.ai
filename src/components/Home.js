// src/components/Home.js

import React from 'react';
import './Home.css'; // Import CSS

const Home = () => {
  return (
    <>
      <div className="home-container">
        <header className="home-header">
          <p>Your one-stop solution for all your gardening needs.</p>
        </header>

        <section className="features">
          <h2>Features</h2>
          <ul>
            <li>Search for various plants and their requirements.</li>
            <li>Get tips on plant care and maintenance.</li>
            <li>Explore a gallery of beautiful plants.</li>
            <li>Join our community of gardening enthusiasts.</li>
          </ul>
        </section>

        <section className="gallery">
          <h2>Gallery</h2>
          <div className="gallery-images">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJd6srnaSlB5jbAFHTBIjlRBEF2QSejh5IJA&s" alt="Plant 1" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0UxowmmisT2CKJo5gzCmqYH7CEawFrb7ddw&s" alt="Plant 2" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU-G5f0wa_t0licd0i2Nxk34UEHXtXJFf5vQ&s" alt="Plant 3" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSamTOq-K28abyJeYAko7_UyRPWdqAnVmrgUA&s" alt="Plant 4" />
            <img src="https://tse4.mm.bing.net/th?id=OIP.qB_pXl1pR3DrnF_3JsDVuQHaE8&pid=Api&P=0&h=220" alt="Plant 5" />
          </div>
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
          <p>&copy; 2023 Gardening App. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default Home;
