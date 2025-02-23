import { ChatOllama } from "@langchain/ollama";
import { ChatGroq } from "@langchain/groq";
import dotenv from 'dotenv';

dotenv.config();

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,  
  model: "deepseek-r1-distill-llama-70b",
  temperature: 0
});

async function LLMCall(userPrompt) {
  try {
    // const llm = new ChatOllama({
    //   model: "deepseek-r1",
    //   temperature: 0,
    //   maxRetries: 2,
    // });

    const aiMsg = await llm.invoke([
      {
        role: "system",
        content: "You are a helpful assistant. Your task is to understand the input provided by the user and create a detailed summary of the content. Please provide a summary of the following text: \n\n"
      },
      {
        role: "user",
        content: userPrompt
      }
    ]);

    const cleanedContent = aiMsg.content.replace(/<think>.*?<\/think>/gs, "").trim();
    
    return cleanedContent;
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error("Failed to get response: ${error.message}");
  }
}

export { LLMCall };