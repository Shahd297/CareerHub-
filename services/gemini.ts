
import { GoogleGenAI, Type } from "@google/genai";
import { Specialization } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async generateDailyTask(specialization: Specialization, level: number, lang: 'ar' | 'en') {
    const prompt = `Act as an expert in ${specialization}. Generate a realistic work task for a level ${level} student on EduCareer platform. Slogan: Experience work before you work. Include title, detailed description, and target skill. Language: ${lang === 'ar' ? 'Arabic' : 'English'}.`;
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              skill: { type: Type.STRING }
            },
            required: ["title", "description", "skill"]
          }
        }
      });
      return JSON.parse(response.text);
    } catch (error) {
      console.error("Error generating task:", error);
      return null;
    }
  },

  async analyzeTaskSubmission(specialization: Specialization, task: string, submission: string, lang: 'ar' | 'en') {
    const prompt = `You are an AI Mentor for EduCareer specialized in ${specialization}. Slogan: Experience work before you work. Evaluate this student submission for the task: "${task}".
    Submission: "${submission}"
    Provide feedback on:
    1. Strengths
    2. Areas for improvement
    3. Final Score (0-100)
    Language: ${lang === 'ar' ? 'Arabic' : 'English'}.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              feedback: { type: Type.STRING },
              score: { type: Type.NUMBER },
              suggestions: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["feedback", "score", "suggestions"]
          }
        }
      });
      return JSON.parse(response.text);
    } catch (error) {
      return { feedback: "Error processing feedback", score: 0, suggestions: [] };
    }
  },

  async generateAssessment(specialization: Specialization, lang: 'ar' | 'en') {
    const prompt = `Create a 10-question placement test for EduCareer platform in ${specialization}. 
    - 3 Beginner questions
    - 4 Intermediate questions
    - 3 Advanced questions
    Format: Multiple choice. Language: ${lang === 'ar' ? 'Arabic' : 'English'}.`;
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctAnswerIndex: { type: Type.INTEGER },
                difficulty: { type: Type.STRING, enum: ["beginner", "intermediate", "advanced"] }
              },
              required: ["question", "options", "correctAnswerIndex", "difficulty"]
            }
          }
        }
      });
      return JSON.parse(response.text);
    } catch (error) {
      console.error("Error generating assessment:", error);
      return [];
    }
  },

  async chatWithMentor(specialization: Specialization, message: string, lang: 'ar' | 'en') {
    const prompt = `You are an AI Mentor for a platform called EduCareer. Slogan: Experience work before you work. Your specialty is ${specialization}. 
    A student is asking: "${message}". 
    Reply clearly and professionally in ${lang === 'ar' ? 'Arabic' : 'English'}. Keep it concise.`;
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      return response.text;
    } catch (error) {
      return "عذراً، أواجه مشكلة في الرد حالياً.";
    }
  }
};
