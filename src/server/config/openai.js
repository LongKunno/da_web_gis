const { Configuration, OpenAIApi, OpenAI } = require('openai');
const dotenv = require('dotenv');
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.CHATGPT_TOKEN,
});

module.exports = openai;
