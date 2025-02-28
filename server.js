const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/ask', async (req, res) => {
  const question = req.body.question;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: question,
        max_tokens: 150,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({ answer: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting response from OpenAI');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
