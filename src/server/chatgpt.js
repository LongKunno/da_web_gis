
var chatHistory = [];
const askToChatGpt = async function (req, res) {

  if (req.body.message.toLowerCase() === 'new_story') {
    chatHistory = [];
    res.send({ from: "chatGpt", data: "new_story" });
    return;
  }
  console.log(chatHistory)

    try {
      const openai = require('./config/openai.js');

      // Construct messages by iterating over the history
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));

      // Add latest user input
      messages.push({ role: 'user', content: req.body.message });

      try {
        const response = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: messages,
        });

        completionText = response.choices[0].message.content

        console.log('Bot: ' + completionText);
        res.send({ from: "chatGpt", data: completionText });

        // Update history with user input and assistant response
        chatHistory.push(['user', req.body.message]);
        chatHistory.push(['assistant', completionText]);
      } catch (error) {
        console.error('Error creating chat completion:', error);
        res.send({ from: "chatGpt", data: "Lỗi xảy ra trong quá trình xử lý!" });
      }

    } catch (error) {
      console.error(error);
      res.send({ from: "chatGpt", data: "Lỗi xảy ra trong quá trình xử lý!" });
    }
};


module.exports = {
  askToChatGpt,
};



