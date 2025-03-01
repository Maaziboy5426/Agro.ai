    import React, { useState } from 'react';
    import { Link } from 'react-router-dom';
    import './PlantSearch.css'; 
    import SlideInNavbar from './SlideInNavbar';

    const cropsData = [
      { name: 'Rice', requirements: 'Kharif crop, Urea, DAP, MOP, Compost, Vermicompost, Azospirillum', image: 'https://static.vecteezy.com/system/resources/thumbnails/050/753/498/small/photograph-of-green-rice-plants-against-a-blue-sky-background-photo.jpg' },
      { name: 'Wheat', requirements: 'Rabi crop, Urea, DAP, Farmyard Manure, Vermicompost', image: 'https://images.squarespace-cdn.com/content/v1/63c44dd4d40ca263a45cc4e3/1674168744026-T11YYATLP0D8CSFY4A8P/unsplash-image-y4xZxzN754M.jpg' },
      { name: 'Jowar (Sorghum)', requirements: 'Kharif crop, Urea, SSP, Compost, Farmyard Manure', image: 'https://tse2.mm.bing.net/th?id=OIP.1SNkbh-H4yGmUlTPxoYFvAHaDy&pid=Api&P=0&h=220' },
      { name: 'Bajra (Pearl Millet)', requirements: 'Kharif crop, Urea, SSP, Compost, Green Manure', image: 'https://c1.wallpaperflare.com/preview/652/676/968/pearl-millet-bajra-cultivation-lingsugur.jpg' },
      { name: 'Sugarcane', requirements: 'Annual cash crop, Urea, DAP, MOP, Pressmud, Green Manure', image: 'https://tse2.mm.bing.net/th?id=OIP.GhHhbII0LK8KN2hX0DkZ_wHaE7&pid=Api&P=0&h=220' },
      { name: 'Cotton', requirements: 'Kharif cash crop, Urea, SSP, MOP, Neem Cake, Farmyard Manure', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS69bn1Do1LmzNE6eT4UNQYGBpxc6pizOgRiw&s' },
      { name: 'Tur (Pigeon Pea)', requirements: 'Kharif pulse, DAP, Urea, Rhizobium, Compost', image: 'https://tse4.mm.bing.net/th?id=OIP.qZKYZ2MZC4dWpUpLWy0M5wHaDJ&pid=Api&P=0&h=220' },
      { name: 'Gram (Chickpea)', requirements: 'Rabi pulse, DAP, Urea, Farmyard Manure, Rhizobium', image: 'https://tse3.mm.bing.net/th?id=OIP.WzMbTe7U50xAFaCw9gy3EgHaE8&pid=Api&P=0&h=220' },
      { name: 'Onion', requirements: 'Rabi vegetable, Urea, DAP, Cow Dung, Poultry Manure', image: 'https://tse2.mm.bing.net/th?id=OIP.hODE6NRIogfKurVA_hDG6gHaE8&pid=Api&P=0&h=220' },
      { name: 'Tomato', requirements: 'Kharif vegetable, Urea, SSP, Compost, Cow Dung', image: 'https://tse1.mm.bing.net/th?id=OIP.wZSJa1Vj0EBMJHrkSEbhvwHaHa&pid=Api&P=0&h=220' },
      { name: 'Brinjal (Eggplant)', requirements: 'Kharif vegetable, Urea, SSP, Cow Dung, Compost', image: 'https://tse2.mm.bing.net/th?id=OIP.YPsD0OEolhZlmvbYtNbYwAHaE7&pid=Api&P=0&h=220' },
      { name: 'Soybean', requirements: 'Kharif oilseed, DAP, Urea, Rhizobium, Farmyard Manure', image: 'https://healthjade.com/wp-content/uploads/2017/10/soybean.jpg' },
      { name: 'Groundnut (Pea)', requirements: 'Kharif oilseed, SSP, MOP, Gypsum, Farmyard Manure', image: 'https://tse3.mm.bing.net/th?id=OIP.ZK7iyb0SRgBk7QBKXUFf1wHaE7&pid=Api&P=0&h=220' }

    ];

    const fruitsData = [
      { name: 'Mango', requirements: 'Perennial fruit, Urea, MOP, Cow Dung, Vermicompost', image: 'https://tse2.mm.bing.net/th?id=OIP.S9yszaMO9nl8VRRxfTEXWAHaEJ&pid=Api&P=0&h=220' },
      { name: 'Banana', requirements: 'Perennial fruit, Urea, DAP, Vermicompost, Banana Pseudostem', image: 'https://tse4.mm.bing.net/th?id=OIP.oub4k9oanVjKprYX2b9p6gHaE7&pid=Api&P=0&h=220' },
      { name: 'Grapes', requirements: 'Perennial fruit, Urea, DAP, MOP, Farmyard Manure', image: 'https://tse4.mm.bing.net/th?id=OIP.8LR5I9E1Uz2C_dJqhYew1QHaEK&pid=Api&P=0&h=220' },
      { name: 'Pomegranate', requirements: 'Perennial fruit, Urea, DAP, MOP, Cow Dung', image: 'https://tse4.mm.bing.net/th?id=OIP.PxSX5kJn6amglu5fhpInaQHaE8&pid=Api&P=0&h=220' },
      { name: 'Guava', requirements: 'Perennial fruit, Urea, Compost, MOP, Organic Manure', image: 'https://tse3.mm.bing.net/th?id=OIP.8L6Jj7mITTYM5ELY20qkLwHaFj&pid=Api&P=0&h=220' },
      { name: 'Orange', requirements: 'Perennial fruit, Urea, DAP, Cow Dung, Organic Mulch', image: 'https://tse2.mm.bing.net/th?id=OIP.kG7QrXgCOplxcJIMF75n8wHaEz&pid=Api&P=0&h=220' },
      { name: 'Strawberry', requirements: 'Annual fruit, Urea, Compost, Cow Manure, Vermicompost', image: 'https://tse2.mm.bing.net/th?id=OIP.FiUPbPYciY7lwd5C07H1_wHaFj&pid=Api&P=0&h=220' },
      { name: 'Custard Apple', requirements: 'Perennial fruit, Urea, Cow Dung, Compost, Organic Mulch', image: 'https://tse1.mm.bing.net/th?id=OIP.a8Hno0wDAi4AHA-390bIbgHaE8&pid=Api&P=0&h=220' },
      { name: 'Jackfruit', requirements: 'Perennial fruit, Urea, Farmyard Manure, Cow Dung, Compost', image: 'https://tse4.mm.bing.net/th?id=OIP.Ol-uyi9IFc7pGVsm2rOsPQAAAA&pid=Api&P=0&h=220' },
      { name: 'Papaya', requirements: 'Annual fruit, Urea, DAP, Cow Manure, Compost', image: 'https://tse1.mm.bing.net/th?id=OIP.60QB2ziQwBSAi7BHlPl4GQHaHa&pid=Api&P=0&h=220' }
    ];


    const PlantSearch = () => {
      const [searchQuery, setSearchQuery] = useState('');

      const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
      };

      const filteredCrops = cropsData.filter(crop =>
        crop.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const filteredFruits = fruitsData.filter(fruit =>
        fruit.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return (
        <div className="plant-search-container">
          <SlideInNavbar />
          <h3>Search for Plants</h3>
          <input
            type="text"
            placeholder="Search for a plant..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div>
            <h4>Crops</h4>
            {filteredCrops.length > 0 ? (
              <div className="plant-grid">
                {filteredCrops.map((crop, index) => (
                  <div key={index} className="plant-card">
                    <img src={crop.image} alt={crop.name} className="plant-image" />
                    <strong>{crop.name}</strong>: {crop.requirements}
                  </div>
                ))}
              </div>
            ) : (
              <p>No crops found.</p>
            )}
          </div>
          <div>
            <h4>Fruits</h4>
            {filteredFruits.length > 0 ? (
              <div className="plant-grid">
                {filteredFruits.map((fruit, index) => (
                  <div key={index} className="plant-card">
                    <img src={fruit.image} alt={fruit.name} className="plant-image" />
                    <strong>{fruit.name}</strong>: {fruit.requirements}
                  </div>
                ))}
              </div>
            ) : (
              <p>No fruits found.</p>
            )}
          </div>
        </div>
      );
    };

    export default PlantSearch;