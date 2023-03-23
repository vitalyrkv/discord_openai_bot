const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: "my_openai_token_here",
});
const openai = new OpenAIApi(configuration);
async function ask(prompt) {
    const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
const answer = response.data.choices[0].text;
return answer
}

module.exports = {
    ask
}