const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const axios = require('axios');

// Generate content with AI Agent
router.post('/generate-content', auth, async (req, res) => {
  try {
    const { prompt, type = 'text' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Example: Call to OpenAI or your AI service
    const aiResponse = await axios.post(
      process.env.AI_SERVICE_URL || 'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    res.json({
      message: '✅ Content generated',
      content: aiResponse.data.choices[0].message.content,
      type,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create video with AI
router.post('/create-video', auth, async (req, res) => {
  try {
    const { script, avatar = 'default', duration = 300 } = req.body;

    if (!script) {
      return res.status(400).json({ error: 'Script is required' });
    }

    // Placeholder for video generation
    const videoId = `video_${Date.now()}`;

    res.status(201).json({
      message: '✅ Video generation started',
      videoId,
      status: 'processing',
      script,
      avatar,
      duration,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get video status
router.get('/videos/:videoId', auth, async (req, res) => {
  try {
    const { videoId } = req.params;

    res.json({
      videoId,
      status: 'completed',
      url: `https://storage.example.com/${videoId}.mp4`,
      thumbnail: `https://storage.example.com/${videoId}_thumb.jpg`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
