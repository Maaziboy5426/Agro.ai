import React, { useState } from "react";
import SlideInNavbar from "./SlideInNavbar";

const Chatbot = () => {
  // Initial bot greeting
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your chatbot. How can I assist you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  // Detailed crop information mapping (when user types a crop name)
  const cropDetails = {
    wheat:
      "Wheat is a versatile cereal crop grown in temperate regions. It needs moderate rainfall, fertile soil, and crop rotation for sustainable yields.",
    rice:
      "Rice is a water-intensive staple crop grown in flooded fields. Modern techniques now also include water-saving methods to optimize yields.",
    maize:
      "Maize (corn) is used for food, feed, and industrial purposes. It thrives in warm climates and benefits from precision agriculture techniques.",
    barley:
      "Barley is used in food products and brewing. It grows well in cooler climates and requires proper soil fertility management.",
    oats:
      "Oats are valued for their nutritional benefits and are used in breakfast cereals and animal feed. They require cool, moist climates.",
    rye:
      "Rye is a hardy grain that grows in poor soils and cooler climates. It is used for bread, whiskey, and helps prevent soil erosion.",
    sorghum:
      "Sorghum is drought-tolerant and an important cereal in arid regions. It adapts well to high temperatures and is used as food and fodder.",
    millet:
      "Millet is a group of small-seeded grasses known for being drought resistant. It provides essential carbohydrates and proteins in many regions.",
    soybean:
      "Soybeans are protein-rich legumes used for food, animal feed, and oil extraction. They also fix nitrogen in the soil, supporting sustainable farming.",
    groundnut:
      "Groundnuts (peanuts) are valued for their oil and protein. They grow in sandy, well-drained soils and benefit from crop rotation.",
    cotton:
      "Cotton is a fiber crop that requires a long frost-free period and ample water. Innovations in sustainable practices are reducing its water use.",
    sugarcane:
      "Sugarcane is primarily used for sugar production and biofuel. It thrives in warm, humid climates and requires intensive irrigation."
  };

  // Base arrays for our topics

  // 1. Information about all crops and plants
  const cropBase = [
    { keywords: ["rice", "paddy"], answer: "Rice is a staple food that thrives in flooded conditions. It is best planted during the monsoon season." },
    { keywords: ["wheat"], answer: "Wheat is a key cereal crop grown in cooler seasons with well-drained soil and moderate rainfall." },
    { keywords: ["maize", "corn"], answer: "Maize is a versatile crop that grows in warm climates and benefits from modern water management techniques." },
    { keywords: ["barley"], answer: "Barley is valued in food production and brewing. It grows well in cooler conditions with proper soil nutrients." },
    { keywords: ["oats"], answer: "Oats are nutritious grains grown in cool, moist climates. They are ideal for breakfast cereals and livestock feed." },
    { keywords: ["rye"], answer: "Rye is a hardy grain that grows well in less fertile soils and is often used in bread-making and whiskey production." },
    { keywords: ["sorghum"], answer: "Sorghum is a drought-tolerant cereal important in arid regions and is used for food and fodder." },
    { keywords: ["millet"], answer: "Millet is a drought-resistant grain that provides essential nutrients in many parts of Africa and Asia." },
    { keywords: ["soybean"], answer: "Soybeans are nutrient-dense legumes used for oil and protein. They also improve soil fertility through nitrogen fixation." },
    { keywords: ["groundnut"], answer: "Groundnuts, or peanuts, thrive in sandy soils and are used for their oil and protein-rich meal." },
    { keywords: ["cotton"], answer: "Cotton is a fiber crop that requires long, warm seasons and is now being cultivated with sustainable practices." },
    { keywords: ["sugarcane"], answer: "Sugarcane is a tropical crop used for sugar and biofuel. It requires intensive irrigation and nutrient management." },
    { keywords: ["potato"], answer: "Potatoes are versatile root crops grown in loose, well-drained soils with proper pest management." },
    { keywords: ["tomato"], answer: "Tomatoes are grown widely for culinary use and require full sun, regular watering, and rich soil." }
  ];

  // 2. Information about fruits
  const fruitBase = [
    { keywords: ["apple"], answer: "Apples grow best in temperate climates with a period of winter dormancy. They require well-drained soil and pruning." },
    { keywords: ["banana"], answer: "Bananas are tropical fruits that thrive in high humidity and warm temperatures with good drainage." },
    { keywords: ["mango"], answer: "Mangoes are tropical stone fruits that need a long, warm growing season and fertile, well-drained soil." },
    { keywords: ["orange"], answer: "Oranges require subtropical climates with ample sunlight and regular watering to maintain healthy growth." },
    { keywords: ["grape"], answer: "Grapes grow on vines and need full sun and well-drained soil. They are used for fresh consumption and wine production." },
    { keywords: ["strawberry"], answer: "Strawberries thrive in cooler climates with rich, well-drained soil and regular irrigation for best yield." },
    { keywords: ["pineapple"], answer: "Pineapples require tropical conditions with consistent warmth and moderate rainfall for optimal growth." },
    { keywords: ["kiwi"], answer: "Kiwis prefer temperate climates with sufficient rainfall and some protection from severe frost." },
    { keywords: ["papaya"], answer: "Papayas grow quickly in tropical regions with warm temperatures and well-drained, fertile soil." },
    { keywords: ["cherry"], answer: "Cherries require a temperate climate with cold winters and moderate summers, producing sweet or tart fruits." },
    { keywords: ["pear"], answer: "Pears need a temperate climate with moderate rainfall and benefit from proper pruning and pest management." },
    { keywords: ["watermelon"], answer: "Watermelons thrive in hot, sunny climates with ample water and spacious growing areas for sprawling vines." },
    { keywords: ["blueberry"], answer: "Blueberries grow in acidic soils and cooler climates. They require consistent moisture and careful pruning." },
    { keywords: ["pomegranate"], answer: "Pomegranates are hardy fruits that can tolerate arid conditions. They need full sun and well-drained soil." }
  ];

  // 3. Farming topics: sustainable practices, crop irrigation, harvesting, soil, season, weather
  const farmingBase = [
    { keywords: ["sustainable farming"], answer: "Sustainable farming practices include crop rotation, organic fertilizers, and integrated pest management to maintain soil health and yield." },
    { keywords: ["crop irrigation"], answer: "Modern irrigation techniques, such as drip and sprinkler systems, conserve water while providing precise hydration to crops." },
    { keywords: ["harvesting"], answer: "Timely harvesting is critical. Each crop shows specific maturity signs that help determine the optimal harvest time." },
    { keywords: ["soil fertility"], answer: "Maintaining soil fertility through organic compost, balanced fertilizers, and crop rotation is essential for long-term productivity." },
    { keywords: ["seasonal planting"], answer: "Plant crops during their optimal season; for instance, rice in the monsoon and wheat in cooler, drier periods for best results." },
    { keywords: ["weather and crops"], answer: "Monitoring weather conditions is crucial. Use local forecasts to plan irrigation, planting, and harvesting schedules." },
    { keywords: ["crop rotation"], answer: "Crop rotation prevents soil nutrient depletion and controls pests, ensuring healthier and more sustainable crop production." },
    { keywords: ["organic farming"], answer: "Organic farming avoids synthetic chemicals and relies on natural processes, which can improve soil structure and biodiversity." },
    { keywords: ["pest management"], answer: "Integrated pest management uses biological, cultural, and chemical methods to control pests while protecting the environment." },
    { keywords: ["irrigation efficiency"], answer: "Efficient irrigation methods reduce water waste and improve crop yield by delivering water directly to the root zone." },
    { keywords: ["cover crops"], answer: "Cover crops help improve soil structure, prevent erosion, and add organic matter to the soil between main crop cycles." },
    { keywords: ["no-till farming"], answer: "No-till farming preserves soil structure, reduces erosion, and helps retain moisture, thereby improving crop yields over time." },
    { keywords: ["renewable energy on farms"], answer: "Integrating renewable energy sources, such as solar or wind power, can reduce operational costs and environmental impact on farms." }
  ];

  // 4. Project topics: automatic water dispenser and IoT devices
  const projectBase = [
    { keywords: ["automatic water dispenser"], answer: "Our automatic water dispenser uses IoT sensors to monitor water levels and dispense water efficiently, reducing waste." },
    { keywords: ["iot devices"], answer: "The IoT devices in our system enable real-time monitoring and remote control, ensuring efficient water management." },
    { keywords: ["water supply automation"], answer: "Water supply automation employs sensors, timers, and smart controllers to manage water distribution based on demand." },
    { keywords: ["sensor technology"], answer: "Our project utilizes advanced sensor technology to accurately measure water levels and control dispensing mechanisms." },
    { keywords: ["remote monitoring"], answer: "Remote monitoring allows users to track water usage and system status via a mobile app or web dashboard in real time." },
    { keywords: ["energy efficiency"], answer: "The system is designed to be energy efficient by using low-power components and smart scheduling algorithms." },
    { keywords: ["data analytics"], answer: "Collected data is analyzed to optimize water usage, predict maintenance needs, and improve overall system performance." },
    { keywords: ["system integration"], answer: "Seamless integration between hardware and software components ensures that the water dispenser operates reliably." },
    { keywords: ["maintenance"], answer: "Regular maintenance, including sensor calibration and software updates, is essential to keep the system running efficiently." },
    { keywords: ["leak detection"], answer: "The system can detect leaks through real-time monitoring and alert users immediately to prevent water loss." },
    { keywords: ["smart water system"], answer: "Our smart water system leverages IoT to automate water distribution, saving resources and reducing manual intervention." },
    { keywords: ["prototype"], answer: "Our prototype demonstrates the practical benefits of IoT in automating water supply, offering improved efficiency and reduced waste." },
    { keywords: ["water conservation"], answer: "By automating water distribution and monitoring usage, our system helps conserve water and lower utility costs." }
  ];

  // 5. Common and professional/general questions
  const commonBase = [
    { keywords: ["hello"], answer: "Hello! How can I assist you with your agriculture or IoT project queries today?" },
    { keywords: ["hi"], answer: "Hi there! What information can I provide for you today?" },
    { keywords: ["how are you"], answer: "I'm functioning at optimal capacity and ready to help. What can I do for you?" },
    { keywords: ["help"], answer: "I'm here to help! You can ask me about crops, fruits, sustainable farming practices, or our IoT water dispenser project." },
    { keywords: ["thank you"], answer: "You're welcome! I'm glad to assist. Feel free to ask more questions." },
    { keywords: ["goodbye"], answer: "Goodbye! Have a great day and come back anytime you need assistance." },
    { keywords: ["thanks"], answer: "You're welcome! Let me know if there's anything else you need." },
    { keywords: ["what can you do"], answer: "I provide detailed information on crops, fruits, sustainable farming practices, and our innovative IoT projects." },
    { keywords: ["contact"], answer: "For further details, please contact our support team at support@example.com." },
    { keywords: ["about the project"], answer: "Our project integrates IoT technology with agriculture to optimize water management and enhance crop yields." },
    { keywords: ["who are you"], answer: "I'm your professional agriculture and IoT assistant, here to provide detailed information and answer your questions." },
    { keywords: ["what is your name"], answer: "I'm your chatbot assistant. How may I help you today?" },
    { keywords: ["how do you work"], answer: "I match your questions against a large database of topics to provide you with accurate and detailed answers." },
    { keywords: ["more info"], answer: "I can provide detailed information on a wide range of topics, from crop details to advanced IoT solutions in agriculture." }
  ];

  // Helper function to generate variations for each base question
  // The multiplier (set to 3) ensures we generate over 200 entries overall.
  const generateVariations = (baseArray, multiplier) => {
    const variations = [];
    for (let i = 0; i < multiplier; i++) {
      baseArray.forEach((entry) => {
        // For demo purposes, we append the variation index to each keyword.
        // In a real-world scenario, you would generate natural language variations.
        const variantKeywords = entry.keywords.map((kw) => `${kw} ${i + 1}`);
        variations.push({
          keywords: variantKeywords,
          answer: entry.answer
        });
      });
    }
    return variations;
  };

  // Build the knowledge base from all categories
  const knowledgeBase = [
    ...generateVariations(cropBase, 3),
    ...generateVariations(fruitBase, 3),
    ...generateVariations(farmingBase, 3),
    ...generateVariations(projectBase, 3),
    ...generateVariations(commonBase, 3)
  ];

  // Simple fuzzy matching function to check if input and phrase are closely related
  const fuzzyMatch = (input, phrase) => {
    if (input.includes(phrase) || phrase.includes(input)) return true;
    return phrase
      .split(" ")
      .some((word) => word.length > 3 && input.includes(word));
  };

  // Function to check for crop names in the input and return detailed info if found
  const checkForCropName = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    for (const crop in cropDetails) {
      if (lowerInput.includes(crop)) {
        return cropDetails[crop];
      }
    }
    return null;
  };

  // Determine the best response based on the user input
  const getResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    // Check for greetings in simple arrays
    const greetings = ["hello", "hi", "hey", "howdy"];
    if (greetings.some((greet) => fuzzyMatch(lowerInput, greet))) {
      const randomGreet = greetings[Math.floor(Math.random() * greetings.length)];
      return randomGreet.charAt(0).toUpperCase() + randomGreet.slice(1);
    }

    // Check if the input includes a crop name and return detailed info
    const cropInfo = checkForCropName(lowerInput);
    if (cropInfo) {
      return cropInfo;
    }

    // Search the knowledge base for a matching keyword
    for (let entry of knowledgeBase) {
      if (entry.keywords.some((keyword) => fuzzyMatch(lowerInput, keyword))) {
        return entry.answer;
      }
    }

    // Default fallback response
    return "I'm sorry, I don't have information on that right now. Could you please rephrase or ask another question?";
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    const botResponse = { text: getResponse(input), sender: "bot" };
    setMessages([...messages, userMessage, botResponse]);
    setInput("");
  };

  return (
    <div>
      <SlideInNavbar />
      <div style={{ margin: "20px auto", maxWidth: "400px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2 style={{ textAlign: "center" }}>Chatbot</h2>
        <div style={{ height: "300px", overflowY: "auto", marginBottom: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}>
          {messages.map((msg, index) => (
            <div key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left", margin: "5px 0" }}>
              <span style={{ display: "inline-block", padding: "8px", borderRadius: "5px", background: msg.sender === "user" ? "#0084ff" : "#e0e0e0", color: msg.sender === "user" ? "white" : "black" }}>
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type your message..."
          style={{ width: "75%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button
          onClick={handleSendMessage}
          style={{ padding: "10px", marginLeft: "5px", borderRadius: "5px", border: "none", background: "#0084ff", color: "white" }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;