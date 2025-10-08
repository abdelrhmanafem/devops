import { GoogleGenAI, Type } from "@google/genai";
import { CloudRunService, GeminiAnalysis } from '../types';

// Lazily initialize to avoid errors on module load if API key is missing.
let ai: GoogleGenAI | null = null;

const getAiClient = (): GoogleGenAI => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set. Please configure it to use Gemini features.");
  }
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};


export const analyzeServiceHealth = async (service: CloudRunService): Promise<GeminiAnalysis> => {
  const prompt = `
    Analyze the health of the following Google Cloud Run service and provide a concise summary and actionable recommendations.
    Service Data:
    - Name: ${service.name}
    - Region: ${service.region}
    - Description: ${service.description}
    - CPU Utilization: ${service.cpuUtilization}%
    - Memory Utilization: ${service.memoryUtilization}%
    - Error Rate: ${service.errorRate}%
    - Status: ${service.status}

    Based on this data, evaluate the service's performance and stability.
    The summary should be a single paragraph.
    The recommendations should be a list of 2-3 specific, actionable steps to improve the service's health or performance.
  `;
  const client = getAiClient();
  const response = await client.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: {
            type: Type.STRING,
            description: "A concise, single-paragraph summary of the service's health."
          },
          recommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING
            },
            description: "A list of actionable recommendations."
          }
        },
        required: ["summary", "recommendations"]
      },
    }
  });

  const jsonText = response.text.trim();
  return JSON.parse(jsonText) as GeminiAnalysis;
};

export const generateGcloudCommand = async (prompt: string): Promise<string> => {
  const client = getAiClient();
  const response = await client.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
        systemInstruction: "You are a Google Cloud gcloud expert. Your task is to convert natural language requests into precise `gcloud run` commands. Only return the command itself, without any explanation, code fences, or extra text."
    }
  });

  return response.text.trim();
};