// File: pages/api/chatbot.js

import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }

  try {
    // Call the OpenAI Chat Completion API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error });
    }

    // Return ChatGPT's response
    const chatResponse = data.choices[0].message.content;
    res.status(200).json({ response: chatResponse });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch response from ChatGPT' });
  }
}