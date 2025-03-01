import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Chatbot.css";
import SlideInNavbar from "./SlideInNavbar";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your chatbot. How can I assist you today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");

  // Basic arrays
  const greetings = ["hello", "hi", "hey", "howdy"];
  const weatherQuestions = [
    "what's the weather forecast",
    "will it rain today",
    "is there a frost warning",
  ];
  const goodbyes = ["bye", "goodbye", "see you later", "take care"];

  // Existing crop questions (general ones)
  const cropQuestions = [
    "what crops are best for this season",
    "how do i improve soil fertility",
    "any tips for pest control",
  ];

  // New topic arrays (from previous example)
  const waterSupplyQuestions = [
    "how does an automatic water supply system function?",
    "what technology is used in automatic water supply systems?",
    "what are the advantages of automated water distribution?",
    "how is water usage monitored in automatic systems?",
    "what sensors are typically used in water supply automation?",
    "how do smart water systems conserve resources?",
    "what is the role of IoT in automatic water supply?",
    "how do automatic water systems adjust to demand?",
    "what maintenance does an automatic water supply require?",
    "can automatic water supply systems detect leaks?",
    "how do weather conditions affect automatic water systems?",
    "what are the energy savings of automated water systems?",
    "how is data collected in automatic water supply networks?",
    "what protocols do smart water systems use?",
    "how does an automatic water meter work?",
    "what improvements have been made in water distribution technology?",
    "how do automated water systems integrate with smart homes?",
    "what is the impact of automation on water supply reliability?",
    "how can automatic water systems reduce wastage?",
    "what are the common challenges in automatic water management?",
    "how is automatic water distribution controlled remotely?",
    "what innovations are there in water supply automation?",
    "how do sensors in water systems prevent overwatering?",
    "what are the cost benefits of automatic water supply?",
    "how do modern water supply systems operate efficiently?",
  ];

  const farmingQuestions = [
    "what are the latest sustainable farming techniques?",
    "how can technology improve farming productivity?",
    "what are organic farming practices and benefits?",
    "how does crop rotation benefit soil health?",
    "what role does precision agriculture play in modern farming?",
    "how do farmers reduce pesticide usage?",
    "what are effective methods for pest control in farming?",
    "how can renewable energy be used on farms?",
    "what practices support soil fertility naturally?",
    "how does no-till farming work?",
    "what are the benefits of agroforestry?",
    "how can vertical farming be implemented?",
    "what are the challenges of urban farming?",
    "how do farmers use drones for crop monitoring?",
    "what are the economic benefits of sustainable farming?",
    "how is technology transforming traditional farming?",
    "what irrigation techniques boost crop yield?",
    "how do cover crops enhance soil structure?",
    "what are the benefits of organic fertilizers?",
    "how can integrated pest management improve farming?",
    "what is regenerative agriculture and its impact?",
    "how do modern farmers manage water efficiently?",
    "what is the future of smart farming?",
    "how does climate change affect agricultural practices?",
    "what role does biotechnology play in farming?",
  ];

  const irrigationQuestions = [
    "what are the different types of irrigation systems?",
    "how does drip irrigation improve water efficiency?",
    "what are the benefits of sprinkler irrigation?",
    "how is automated irrigation scheduling implemented?",
    "what is the role of soil moisture sensors in irrigation?",
    "how can irrigation be optimized for crop yield?",
    "what are the challenges in designing an irrigation system?",
    "how do farmers decide on irrigation timings?",
    "what innovations exist in irrigation technology?",
    "how does irrigation automation reduce labor costs?",
    "what is the impact of irrigation on water conservation?",
    "how can irrigation systems be integrated with weather data?",
    "what maintenance is required for drip irrigation systems?",
    "how does irrigation efficiency affect farming profitability?",
    "what are best practices for irrigation management?",
    "how do smart irrigation systems operate?",
    "what role does technology play in irrigation planning?",
    "how does sprinkler system design vary by crop?",
    "what are the cost implications of modern irrigation systems?",
    "how can irrigation systems adapt to changing climates?",
    "what is the future of precision irrigation?",
    "how do automatic valves control water flow in irrigation?",
    "what factors determine the choice of irrigation method?",
    "how does surface irrigation compare to other methods?",
    "what are the environmental benefits of efficient irrigation?",
  ];

  const natureQuestions = [
    "what are effective ways to conserve natural resources?",
    "how can individuals help protect the environment?",
    "what are the benefits of biodiversity conservation?",
    "how does climate change impact nature?",
    "what are strategies for sustainable living?",
    "how do renewable energy sources benefit nature?",
    "what are the best practices for waste management?",
    "how can communities promote environmental conservation?",
    "what role does reforestation play in nature preservation?",
    "how can urban planning support green spaces?",
    "what are the impacts of pollution on natural ecosystems?",
    "how do conservation efforts support wildlife?",
    "what is the importance of protecting water bodies?",
    "how can we reduce our carbon footprint?",
    "what are the challenges in environmental conservation?",
    "how does sustainable agriculture benefit the environment?",
    "what are the advantages of eco-friendly technologies?",
    "how do national parks contribute to nature conservation?",
    "what are effective methods to promote recycling?",
    "how can legislation protect natural habitats?",
    "what are the benefits of organic farming for the environment?",
    "how does reducing plastic use impact nature?",
    "what role do environmental NGOs play?",
    "how can we support conservation initiatives?",
    "what is the future of sustainable environmental practices?",
  ];

  // New array: Detailed Crop Names & Answers (50 entries)
  const cropDetails = {
    wheat:
      "Wheat is a staple cereal crop grown in temperate regions. It requires moderate rainfall, fertile soil, and proper rotation to maintain productivity. Modern wheat farming often involves improved varieties and integrated pest management.",
    rice:
      "Rice is a water-intensive crop that is a staple food for more than half the world’s population. It is typically grown in flooded fields which help control weeds and pests, although water-saving techniques are being adopted in many regions.",
    maize:
      "Maize, or corn, is versatile for food, feed, and industrial uses. It grows best in warm climates with plenty of sunlight. Advanced farming techniques, including precision agriculture, have increased maize yield significantly.",
    barley:
      "Barley is used in food products and brewing. It is hardy, tolerating cooler climates better than many cereals. Crop rotation and soil fertility management are important for barley production.",
    oats:
      "Oats are valued for their nutritional content and are used in breakfast cereals and livestock feed. They require cool, moist climates and are often grown in rotation with other grains to maintain soil health.",
    rye:
      "Rye is a resilient grain that grows well in poor soils and harsh climates. It is often used for bread and whiskey production, and its deep root system helps prevent soil erosion.",
    sorghum:
      "Sorghum is a drought-tolerant cereal that is an important food and fodder crop in arid regions. It adapts well to high temperatures and is gaining popularity as a gluten-free grain.",
    millet:
      "Millet comprises a group of small-seeded grasses that are highly nutritious and drought-resistant. It is a staple in many parts of Africa and Asia, providing essential carbohydrates and proteins.",
    soybean:
      "Soybeans are a high-protein legume used for food products, animal feed, and oil extraction. They are a key crop in sustainable farming practices due to their nitrogen-fixing properties.",
    groundnut:
      "Groundnuts, or peanuts, are valued for their oil and protein-rich meal. They grow well in sandy, well-drained soils and benefit from crop rotation to prevent disease buildup.",
    cotton:
      "Cotton is an important fiber crop that requires a long frost-free period and ample water. Advances in genetic modification and sustainable practices are helping reduce its water and pesticide use.",
    sugarcane:
      "Sugarcane is a tropical grass used primarily for sugar production and biofuel. It thrives in warm, humid climates and requires intensive irrigation and nutrient management.",
    potato:
      "Potatoes are a versatile root crop that can be grown in a variety of climates. They require loose, well-drained soil and proper pest and disease management to achieve high yields.",
    tomato:
      "Tomatoes are widely cultivated for their culinary versatility. They require full sun, warm weather, and consistent watering. Modern cultivation techniques include greenhouse production and hydroponics.",
    onion:
      "Onions are a staple vegetable known for their pungent flavor. They grow best in well-drained soils and benefit from crop rotation to minimize pest infestations.",
    garlic:
      "Garlic is valued for both its culinary and medicinal properties. It thrives in sunny locations with well-drained soil and requires minimal maintenance once established.",
    ginger:
      "Ginger is a tropical root used extensively in cooking and traditional medicine. It prefers warm, humid conditions with rich, well-drained soil.",
    carrot:
      "Carrots are a root vegetable that require loose, sandy soil to grow straight and long. They are sensitive to overcrowding, so proper spacing is key for optimal development.",
    cucumber:
      "Cucumbers are warm-season crops that require full sun and well-drained soil. They are often grown on trellises to maximize space and improve air circulation.",
    cabbage:
      "Cabbage is a cool-weather crop used in a variety of dishes. It requires consistent moisture and nutrient-rich soil to prevent bitterness and promote crisp leaves.",
    cauliflower:
      "Cauliflower is a nutritious cruciferous vegetable that thrives in cooler weather. It demands well-managed irrigation and timely pest control to produce a compact head.",
    broccoli:
      "Broccoli is a nutrient-rich vegetable best grown in cool weather. It benefits from high soil fertility and steady water supply to prevent the formation of loose florets.",
    spinach:
      "Spinach is a fast-growing leafy green that is best harvested young. It prefers cool climates and requires regular watering to prevent bolting in hot weather.",
    lettuce:
      "Lettuce is a popular salad green that grows quickly in cool seasons. It needs consistent moisture and partial shade in warmer climates to avoid bolting.",
    "bell pepper":
      "Bell peppers are warm-season crops that require full sun and rich, well-drained soil. They benefit from consistent irrigation and nutrient management for optimal color and size.",
    "chili pepper":
      "Chili peppers are used for both flavor and heat. They thrive in warm climates with plenty of sunlight and well-drained soil, and their capsaicin content is influenced by growing conditions.",
    eggplant:
      "Eggplants are warm-season vegetables that require ample heat and sun. They perform best in well-drained, fertile soil and benefit from regular pruning to improve yield.",
    pumpkin:
      "Pumpkins are grown for both culinary and ornamental purposes. They need a long growing season, plenty of space, and regular watering to develop their characteristic large fruit.",
    watermelon:
      "Watermelons are a popular summer fruit that thrive in hot, sunny climates. They require ample water and space for sprawling vines to produce sweet, juicy fruit.",
    cantaloupe:
      "Cantaloupe, a type of melon, grows best in warm climates with well-drained soil. It benefits from consistent moisture and good air circulation to prevent fungal diseases.",
    pineapple:
      "Pineapple is a tropical fruit that requires warm temperatures and acidic, well-drained soil. It is typically propagated from crowns and needs protection from frost.",
    banana:
      "Bananas are a tropical fruit that require high humidity, warm temperatures, and well-drained, fertile soil. They grow in large clusters and are sensitive to wind damage.",
    papaya:
      "Papayas are fast-growing tropical fruits that prefer warm climates and rich, well-drained soil. They are sensitive to cold and benefit from regular fertilization.",
    mango:
      "Mangoes are tropical stone fruits known for their sweet flavor. They require a long, warm growing season and well-drained soil to develop full, juicy fruit.",
    apple:
      "Apples are temperate fruits that require a period of winter dormancy. They thrive in well-drained, loamy soils and benefit from proper pruning and pest management.",
    grape:
      "Grapes are grown on vines and used for fresh consumption, juice, or wine. They require full sun, well-drained soil, and careful canopy management for optimal ripening.",
    strawberry:
      "Strawberries are a popular fruit that need well-drained soil and plenty of sunlight. They are often grown in raised beds or containers and require regular watering.",
    blueberry:
      "Blueberries thrive in acidic soils and cool climates. They require consistent moisture, proper pruning, and protection from heavy rains to produce plump berries.",
    raspberry:
      "Raspberries are perennial brambles that require rich, well-drained soil and full sun. They benefit from regular pruning and trellising to support their growth.",
    blackberry:
      "Blackberries are robust brambles that thrive in temperate climates. They require well-drained soil and support structures, and they are known for their vigorous growth.",
    pea:
      "Peas are cool-weather legumes that enrich the soil by fixing nitrogen. They grow on climbing vines or bush varieties and require support for optimal yield.",
    lentils:
      "Lentils are a nutritious legume that grow well in cool, dry conditions. They have a short growing season and are valued for their protein and fiber content.",
    chickpea:
      "Chickpeas are drought-tolerant legumes known for their nutty flavor. They thrive in warm, dry climates and contribute to sustainable farming through nitrogen fixation.",
    sunflower:
      "Sunflowers are known for their large, bright blooms and edible seeds. They require full sun and well-drained soil, and they also help attract beneficial pollinators.",
    canola:
      "Canola is an oilseed crop that grows best in cool temperate regions. It requires careful management of planting dates and nutrient supply to produce high-quality oil.",
    flax:
      "Flax is cultivated for its fiber and seed oil. It thrives in cool climates and well-drained soils, and its fine fibers are used in textiles and health foods.",
    sesame:
      "Sesame is a drought-resistant oilseed crop that grows well in hot climates. It requires a long frost-free period and is valued for its nutty-tasting seeds.",
    quinoa:
      "Quinoa is a nutrient-dense pseudo-cereal that grows in a variety of soils and climates. It is known for its high protein content and gluten-free properties.",
    buckwheat:
      "Buckwheat is a fast-growing crop that improves soil health. It is often used as a cover crop and for producing gluten-free flour.",
    okra:
      "Okra is a warm-season vegetable prized for its edible pods. It thrives in hot, humid conditions and is known for its high fiber content.",
  };

  // Simple fuzzy matching function
  const fuzzyMatch = (input, phrase) => {
    if (input.includes(phrase) || phrase.includes(input)) return true;
    return phrase
      .split(" ")
      .some((word) => word.length > 3 && input.includes(word));
  };

  // Function to check for crop names in the input
  const checkForCropName = (input) => {
    const lowerInput = input.toLowerCase();
    for (const crop in cropDetails) {
      if (lowerInput.includes(crop)) {
        return cropDetails[crop];
      }
    }
    return null;
  };

  const getResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    // Check for greetings
    if (greetings.some((greet) => fuzzyMatch(lowerInput, greet))) {
      return (
        greetings[Math.floor(Math.random() * greetings.length)]
          .charAt(0)
          .toUpperCase() +
        greetings[Math.floor(Math.random() * greetings.length)].slice(1)
      );
    }

    // Check if user input matches any detailed crop names
    const cropDetailResponse = checkForCropName(lowerInput);
    if (cropDetailResponse) {
      return cropDetailResponse;
    }

    // Check general crop-related questions
    if (
      cropQuestions.some((question) => fuzzyMatch(lowerInput, question))
    ) {
      return "For crop farming, consider using crop rotation, intercropping, and organic fertilizers to improve soil fertility and increase yield.";
    }

    // Check fruit-related questions (if any)
    // (You can add a similar block for fruits if desired)

    // Check weather questions
    if (weatherQuestions.some((question) => fuzzyMatch(lowerInput, question))) {
      return "You can check the weather forecast on your local weather website or app. It's crucial to stay updated for optimal conditions.";
    }

    // Check water supply questions
    if (waterSupplyQuestions.some((question) => fuzzyMatch(lowerInput, question))) {
      return "Automatic water supply systems use sensors, timers, and smart controls to efficiently distribute water based on real-time demand, helping conserve water and reduce manual intervention.";
    }

    // Check farming questions
    if (farmingQuestions.some((question) => fuzzyMatch(lowerInput, question))) {
      return "Modern farming techniques, including sustainable practices, organic methods, and precision agriculture, can increase yields while preserving soil health and reducing environmental impact.";
    }

    // Check irrigation questions
    if (irrigationQuestions.some((question) => fuzzyMatch(lowerInput, question))) {
      return "Efficient irrigation methods like drip and sprinkler systems provide targeted watering, minimize waste, and ensure crops receive the optimal amount of moisture.";
    }

    // Check nature questions
    if (natureQuestions.some((question) => fuzzyMatch(lowerInput, question))) {
      return "Protecting nature involves sustainable practices, conservation efforts, and promoting biodiversity. Supporting green initiatives and reducing your carbon footprint can make a difference.";
    }

    // Check goodbyes
    if (goodbyes.some((bye) => fuzzyMatch(lowerInput, bye))) {
      return "Goodbye! See you next time.";
    }

    // Default response
    return "I'm sorry, I don't have information on that right now. Could you ask something else?";
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
      <div className="chat-container">
        <div
          style={{
            maxWidth: "400px",
            margin: "auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <h2>Chatbot</h2>
          <div
            style={{
              height: "300px",
              overflowY: "auto",
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  margin: "5px 0",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px",
                    borderRadius: "5px",
                    background:
                      msg.sender === "user" ? "#0084ff" : "#e0e0e0",
                    color: msg.sender === "user" ? "white" : "black",
                  }}
                >
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
            style={{
              width: "75%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={handleSendMessage}
            style={{
              padding: "10px",
              marginLeft: "5px",
              borderRadius: "5px",
              border: "none",
              background: "#0084ff",
              color: "white",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;