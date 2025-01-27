import OpenAI from "openai";
import readLineSync from "readline-sync";

const OPENAI_API_KEY = '';

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

const getWeatherDetails = (city) => {
  switch (city) {
    case 'pabna': return 'pabna - 27 Degree';
    case 'dhaka': return 'dhaka - 24 Degree';
    case 'chittagong': return 'chittagong - 30 Degree';
    case 'sylhet': return 'sylhet - 28 Degree';
    case 'rajshahi': return 'rajshahi - 29 Degree';
    default: return 'Not found';
  }
};

const tools = {
  "getWeatherDetails": getWeatherDetails,
};

const SYSTEM_PROMPT = `
You are an AI Assistant with START, PLAN, ACTION, Observation and Output State.
Wait for the user prompt and first PLAN using available tools.
After Planning, Take the action with appropriate tools and wait for Observation based on Action. Once you get the observations, Return the AI response based on START prompt and observations.

Strictly follow the JSON output format as in the example.

Available Tools:
- function getWeatherDetails(city: string): string
getWeatherDetails is a function that accepts a city name as a string and returns the weather details.

Example: 
START
{ "type": "user", "user": "What is the sum of weather of pabna and dhaka?" }
{ "type": "plan", "plan": "I will call the getWeatherDetails for pabna" }
{ "type": "action", "function": "getWeatherDetails", "input": "pabna" }
{ "type": "observation", "observation": "27°C" }
{ "type": "plan", "plan": "I will call getWeatherDetails for dhaka" }
{ "type": "action", "function": "getWeatherDetails", "input": "dhaka" }
{ "type": "observation", "observation": "24°C" }
{ "type": "output", "output": "The sum of weather of pabna and dhaka is 24°C" }
`;

const main = async () => {
  const messages: any = [{
    role: 'system',
    content: SYSTEM_PROMPT,
  }];

  while (true) {
    const query = readLineSync.question('>> ');
    const q = { type: 'user', user: query };

    messages.push({
      role: 'user',
      content: JSON.stringify(q),
    });

    while (true) {
      const chat = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: messages,
      });

      const result: any = chat.choices[0].message.content;

      try {
        const call = JSON.parse(result);

        messages.push({ role: 'assistant', content: result });

        if (call.type === 'output') {
          console.log(call.output);
          break;
        } else if (call.type === 'action') {
          const fn = tools[call.function];
          const observation = fn(call.input);

          const obs = { type: 'observation', observation: observation };

          messages.push({ role: 'developer', content: JSON.stringify(obs) });
        }
      } catch (error) {
        console.error('Error parsing assistant response:', error);
        break;
      }
    }
  }
};

main();
